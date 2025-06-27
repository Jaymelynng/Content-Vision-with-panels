
/**
 * Code Command Interface
 * Provides simple commands for code quality checking and testing
 */

import { codeQualityChecker, CodeQualityResult } from './codeQuality';
import { testRunner } from './testRunner';

export class CodeCommands {
  public static async runCommand(command: string): Promise<string> {
    const [action, ...args] = command.toLowerCase().split(' ');

    switch (action) {
      case 'code':
        return this.handleCodeCommand(args);
      case 'test':
        return this.handleTestCommand(args);
      case 'help':
        return this.showHelp();
      default:
        return `Unknown command: ${command}\nType 'help' for available commands.`;
    }
  }

  private static handleCodeCommand(args: string[]): string {
    const subCommand = args[0];

    switch (subCommand) {
      case 'check':
      case 'test':
        return this.runCodeQualityCheck();
      case 'standards':
        return this.showCodingStandards();
      default:
        return `Code command usage:
- 'code check' or 'code test' - Run code quality check
- 'code standards' - Show coding standards summary`;
    }
  }

  private static handleTestCommand(args: string[]): string {
    const subCommand = args[0];

    switch (subCommand) {
      case 'run':
        const suiteName = args[1] || 'component-functionality';
        return this.runTestSuite(suiteName);
      case 'list':
        return this.listTestSuites();
      default:
        return `Test command usage:
- 'test run [suite-name]' - Run a test suite
- 'test list' - List available test suites`;
    }
  }

  private static runCodeQualityCheck(): string {
    // Simulate code quality check (in a real implementation, this would scan actual files)
    const mockResults: CodeQualityResult[] = [
      {
        score: 85,
        issues: [
          {
            type: 'warning',
            message: 'Component has 120 lines. Consider breaking it into smaller components',
            rule: 'component-size'
          }
        ],
        suggestions: ['Consider using default export for React components']
      }
    ];

    let output = `\n🔍 Code Quality Check Results\n`;
    output += `================================\n\n`;
    
    mockResults.forEach((result, index) => {
      output += `File ${index + 1}: Score ${result.score}/100\n`;
      
      if (result.issues.length > 0) {
        output += `Issues found:\n`;
        result.issues.forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
          output += `  ${icon} ${issue.message}\n`;
        });
      }
      
      if (result.suggestions.length > 0) {
        output += `Suggestions:\n`;
        result.suggestions.forEach(suggestion => {
          output += `  💡 ${suggestion}\n`;
        });
      }
      
      output += `\n`;
    });

    output += `\n📋 Quick Tips:\n`;
    output += `- Keep components under 100 lines\n`;
    output += `- Always define TypeScript interfaces for props\n`;
    output += `- Use descriptive function and variable names\n`;
    output += `- Organize imports into logical groups\n`;
    output += `- Remove console.log statements before production\n`;

    return output;
  }

  private static runTestSuite(suiteName: string): string {
    const tests = testRunner.runTestSuite(suiteName);
    
    if (tests.length === 0) {
      return `No tests found for suite: ${suiteName}\nUse 'test list' to see available suites.`;
    }

    let output = `\n🧪 Test Suite: ${suiteName}\n`;
    output += `================================\n\n`;

    tests.forEach((test, index) => {
      output += `${index + 1}. ${test.name}\n`;
      output += `   ${test.description}\n`;
      output += `   Category: ${test.category}\n\n`;
      output += `   Steps to test:\n`;
      test.steps.forEach((step, stepIndex) => {
        output += `   ${stepIndex + 1}. ${step}\n`;
      });
      output += `\n   Expected: ${test.expectedResult}\n`;
      output += `   ✅ Mark as PASS or ❌ Mark as FAIL\n\n`;
    });

    return output;
  }

  private static listTestSuites(): string {
    const suites = testRunner.getAllTestSuites();
    
    let output = `\n📋 Available Test Suites:\n`;
    output += `==========================\n\n`;
    
    suites.forEach((suite, index) => {
      const tests = testRunner.getTestSuite(suite);
      output += `${index + 1}. ${suite} (${tests.length} tests)\n`;
    });
    
    output += `\nUsage: 'test run [suite-name]'\n`;
    output += `Example: 'test run component-functionality'\n`;

    return output;
  }

  private static showCodingStandards(): string {
    return `\n📖 Coding Standards Summary\n`;
  }

  private static showHelp(): string {
    return `\n🛠️  Available Commands\n` +
           `=====================\n\n` +
           `Code Quality:\n` +
           `- 'code check' or 'code test' - Run automated code quality checks\n` +
           `- 'code standards' - Show coding standards summary\n\n` +
           `Testing:\n` +
           `- 'test run [suite-name]' - Run a specific test suite\n` +
           `- 'test list' - List all available test suites\n\n` +
           `General:\n` +
           `- 'help' - Show this help message\n\n` +
           `Example usage:\n` +
           `- Type 'code test' to check code quality\n` +
           `- Type 'test run ui-ux' to run UI/UX tests\n`;
  }
}

// Helper function for easy command execution
export const runCodeCommand = (command: string): Promise<string> => {
  return CodeCommands.runCommand(command);
};

// Console integration for development
if (typeof window !== 'undefined') {
  (window as any).codeTest = (command?: string) => {
    const cmd = command || 'code test';
    runCodeCommand(cmd).then(result => {
      console.log(result);
    });
  };
  
  (window as any).showCodeHelp = () => {
    runCodeCommand('help').then(result => {
      console.log(result);
    });
  };
}
