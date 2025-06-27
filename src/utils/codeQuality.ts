
/**
 * Code Quality Checker Utility
 * Provides automated checks based on coding standards
 */

export interface CodeQualityResult {
  score: number;
  issues: CodeIssue[];
  suggestions: string[];
}

export interface CodeIssue {
  type: 'error' | 'warning' | 'suggestion';
  message: string;
  line?: number;
  rule: string;
}

export class CodeQualityChecker {
  private rules: QualityRule[] = [
    {
      name: 'component-size',
      check: (code: string) => {
        const lines = code.split('\n').length;
        if (lines > 100) {
          return {
            type: 'warning' as const,
            message: `Component has ${lines} lines. Consider breaking it into smaller components (recommended: <100 lines)`,
            rule: 'component-size'
          };
        }
        return null;
      }
    },
    {
      name: 'typescript-interfaces',
      check: (code: string) => {
        const hasProps = code.includes('props:') || code.includes('Props');
        const hasInterface = code.includes('interface') || code.includes('type');
        if (hasProps && !hasInterface) {
          return {
            type: 'error' as const,
            message: 'Component appears to use props but no TypeScript interface is defined',
            rule: 'typescript-interfaces'
          };
        }
        return null;
      }
    },
    {
      name: 'function-naming',
      check: (code: string) => {
        const functionPattern = /const\s+([a-z][a-zA-Z]*)\s*=/g;
        const matches = [...code.matchAll(functionPattern)];
        const issues: CodeIssue[] = [];
        
        matches.forEach(match => {
          const funcName = match[1];
          if (funcName.length < 3) {
            issues.push({
              type: 'suggestion' as const,
              message: `Function name '${funcName}' is too short. Use descriptive names.`,
              rule: 'function-naming'
            });
          }
        });
        
        return issues.length > 0 ? issues : null;
      }
    },
    {
      name: 'import-organization',
      check: (code: string) => {
        const lines = code.split('\n');
        const importLines = lines.filter(line => line.trim().startsWith('import'));
        
        if (importLines.length > 5) {
          const hasOrganization = code.includes('// 1.') || code.includes('// React');
          if (!hasOrganization) {
            return {
              type: 'suggestion' as const,
              message: 'Consider organizing imports into groups (React/external, UI components, custom components, utils)',
              rule: 'import-organization'
            };
          }
        }
        return null;
      }
    }
  ];

  public checkCode(code: string, filename: string): CodeQualityResult {
    const issues: CodeIssue[] = [];
    const suggestions: string[] = [];

    // Run all quality rules
    this.rules.forEach(rule => {
      const result = rule.check(code);
      if (result) {
        if (Array.isArray(result)) {
          issues.push(...result);
        } else {
          issues.push(result);
        }
      }
    });

    // Add general suggestions based on file type
    if (filename.endsWith('.tsx') && !code.includes('export default')) {
      suggestions.push('Consider using default export for React components');
    }

    if (code.includes('console.log') && !filename.includes('dev') && !filename.includes('debug')) {
      issues.push({
        type: 'warning',
        message: 'Remove console.log statements before production',
        rule: 'no-console'
      });
    }

    // Calculate score
    const errorCount = issues.filter(i => i.type === 'error').length;
    const warningCount = issues.filter(i => i.type === 'warning').length;
    const suggestionCount = issues.filter(i => i.type === 'suggestion').length;
    
    let score = 100;
    score -= errorCount * 20;
    score -= warningCount * 10;
    score -= suggestionCount * 5;
    score = Math.max(0, score);

    return {
      score,
      issues,
      suggestions
    };
  }

  public generateReport(results: CodeQualityResult[]): string {
    const totalFiles = results.length;
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / totalFiles;
    
    let report = `# Code Quality Report\n\n`;
    report += `**Files Analyzed:** ${totalFiles}\n`;
    report += `**Average Score:** ${averageScore.toFixed(1)}/100\n\n`;
    
    results.forEach((result, index) => {
      if (result.issues.length > 0) {
        report += `## File ${index + 1} (Score: ${result.score})\n\n`;
        result.issues.forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
          report += `${icon} **${issue.rule}**: ${issue.message}\n`;
        });
        report += '\n';
      }
    });

    return report;
  }
}

interface QualityRule {
  name: string;
  check: (code: string) => CodeIssue | CodeIssue[] | null;
}

// Export singleton instance
export const codeQualityChecker = new CodeQualityChecker();
