
/**
 * Code Quality Checker Utility
 * Provides automated checks based on coding standards
 */

export interface CodeQualityResult {
  score: number;
  issues: CodeIssue[];
  suggestions: string[];
  fileName?: string;
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
      check: (code: string, fileName: string) => {
        const lines = code.split('\n').filter(line => line.trim().length > 0).length;
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
        const hasProps = /\bprops\b|\bProps\b/.test(code);
        const hasInterface = /\binterface\b|\btype\b/.test(code);
        const isComponent = /export\s+(default\s+)?function|export\s+(default\s+)?const.*=.*=>|React\.FC/.test(code);
        
        if (isComponent && hasProps && !hasInterface) {
          return {
            type: 'error' as const,
            message: 'React component uses props but no TypeScript interface is defined',
            rule: 'typescript-interfaces'
          };
        }
        return null;
      }
    },
    {
      name: 'function-naming',
      check: (code: string) => {
        const functionPattern = /const\s+([a-z][a-zA-Z0-9]*)\s*=/g;
        const matches = [...code.matchAll(functionPattern)];
        const issues: CodeIssue[] = [];
        
        matches.forEach(match => {
          const funcName = match[1];
          if (funcName.length < 3) {
            issues.push({
              type: 'suggestion' as const,
              message: `Function name '${funcName}' is too short. Use descriptive names (min 3 characters).`,
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
          const hasReactFirst = importLines[0]?.includes('react');
          if (!hasReactFirst) {
            return {
              type: 'suggestion' as const,
              message: 'Consider organizing imports: React imports first, then external libraries, then internal components',
              rule: 'import-organization'
            };
          }
        }
        return null;
      }
    },
    {
      name: 'console-cleanup',
      check: (code: string, fileName: string) => {
        const hasConsoleLog = /console\.log|console\.warn|console\.error/.test(code);
        const isDevFile = /dev|debug|test/.test(fileName.toLowerCase());
        
        if (hasConsoleLog && !isDevFile) {
          return {
            type: 'warning' as const,
            message: 'Remove console statements before production deployment',
            rule: 'console-cleanup'
          };
        }
        return null;
      }
    },
    {
      name: 'component-exports',
      check: (code: string, fileName: string) => {
        const isComponent = fileName.includes('.tsx') && /^[A-Z]/.test(fileName.split('/').pop()?.replace('.tsx', '') || '');
        const hasDefaultExport = /export\s+default/.test(code);
        
        if (isComponent && !hasDefaultExport) {
          return {
            type: 'suggestion' as const,
            message: 'React components should use default export for consistency',
            rule: 'component-exports'
          };
        }
        return null;
      }
    }
  ];

  public checkCode(code: string, fileName: string = 'unknown'): CodeQualityResult {
    const issues: CodeIssue[] = [];
    const suggestions: string[] = [];

    // Run all quality rules
    this.rules.forEach(rule => {
      const result = rule.check(code, fileName);
      if (result) {
        if (Array.isArray(result)) {
          issues.push(...result);
        } else {
          issues.push(result);
        }
      }
    });

    // Add context-specific suggestions
    if (fileName.endsWith('.tsx')) {
      const hasUseState = code.includes('useState');
      const hasUseEffect = code.includes('useEffect');
      
      if (hasUseState && hasUseEffect && !code.includes('useCallback')) {
        suggestions.push('Consider using useCallback for event handlers in components with state and effects');
      }
    }

    // Calculate score based on issue severity
    const errorCount = issues.filter(i => i.type === 'error').length;
    const warningCount = issues.filter(i => i.type === 'warning').length;
    const suggestionCount = issues.filter(i => i.type === 'suggestion').length;
    
    let score = 100;
    score -= errorCount * 25;    // Errors are critical
    score -= warningCount * 15;  // Warnings are important
    score -= suggestionCount * 5; // Suggestions are minor
    score = Math.max(0, score);

    return {
      score,
      issues,
      suggestions,
      fileName
    };
  }

  public generateDetailedReport(results: CodeQualityResult[]): string {
    const totalFiles = results.length;
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / totalFiles;
    const totalErrors = results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'error').length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'warning').length, 0);
    
    let report = `# 📊 Code Quality Report\n\n`;
    report += `**Files Analyzed:** ${totalFiles}\n`;
    report += `**Average Score:** ${averageScore.toFixed(1)}/100\n`;
    report += `**Total Errors:** ${totalErrors}\n`;
    report += `**Total Warnings:** ${totalWarnings}\n\n`;
    
    if (averageScore >= 90) {
      report += `🎉 **Excellent code quality!** Your codebase follows best practices.\n\n`;
    } else if (averageScore >= 75) {
      report += `✅ **Good code quality** with room for minor improvements.\n\n`;
    } else if (averageScore >= 60) {
      report += `⚠️ **Moderate quality** - several areas need attention.\n\n`;
    } else {
      report += `❗ **Needs improvement** - significant quality issues found.\n\n`;
    }

    // Group issues by type
    const allIssues = results.flatMap(r => r.issues.map(issue => ({ ...issue, fileName: r.fileName })));
    const errorsByRule = new Map<string, CodeIssue[]>();
    
    allIssues.forEach(issue => {
      if (!errorsByRule.has(issue.rule)) {
        errorsByRule.set(issue.rule, []);
      }
      errorsByRule.get(issue.rule)!.push(issue);
    });

    if (errorsByRule.size > 0) {
      report += `## 🔍 Issues by Category\n\n`;
      
      Array.from(errorsByRule.entries()).forEach(([rule, issues]) => {
        const errorCount = issues.filter(i => i.type === 'error').length;
        const warningCount = issues.filter(i => i.type === 'warning').length;
        const suggestionCount = issues.filter(i => i.type === 'suggestion').length;
        
        report += `### ${rule.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
        if (errorCount > 0) report += `❌ ${errorCount} errors  `;
        if (warningCount > 0) report += `⚠️ ${warningCount} warnings  `;
        if (suggestionCount > 0) report += `💡 ${suggestionCount} suggestions`;
        report += `\n\n`;
        
        issues.slice(0, 3).forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
          report += `${icon} ${issue.message}\n`;
        });
        
        if (issues.length > 3) {
          report += `... and ${issues.length - 3} more\n`;
        }
        report += `\n`;
      });
    }

    report += `## 📋 Recommendations\n\n`;
    
    if (totalErrors > 0) {
      report += `1. **Fix errors first** - These prevent proper functionality\n`;
    }
    if (totalWarnings > 0) {
      report += `2. **Address warnings** - These impact code maintainability\n`;
    }
    
    report += `3. **Follow project structure** - Keep components small and focused\n`;
    report += `4. **Use TypeScript properly** - Define interfaces for all props\n`;
    report += `5. **Organize imports** - Group by type for better readability\n\n`;
    
    report += `💡 **Tip:** Run \`codeTest()\` regularly to maintain code quality!\n`;

    return report;
  }

  // New method to check multiple files (simulated)
  public checkProject(): CodeQualityResult[] {
    // In a real implementation, this would scan actual project files
    // For now, we'll simulate checking common component patterns
    const simulatedFiles = [
      {
        name: 'ContentGuide.tsx',
        content: `import React from 'react';\n\nconst ContentGuide = () => {\n  return <div>Content</div>;\n};\n\nexport default ContentGuide;`,
      },
      {
        name: 'Button.tsx', 
        content: `import React from 'react';\n\ninterface ButtonProps {\n  children: React.ReactNode;\n}\n\nconst Button = ({ children }: ButtonProps) => {\n  return <button>{children}</button>;\n};\n\nexport default Button;`,
      }
    ];

    return simulatedFiles.map(file => this.checkCode(file.content, file.name));
  }
}

interface QualityRule {
  name: string;
  check: (code: string, fileName?: string) => CodeIssue | CodeIssue[] | null;
}

// Export singleton instance
export const codeQualityChecker = new CodeQualityChecker();
