
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
      case 'standards':
        return this.showStandards();
      case 'structure':
        return this.showStructure();
      default:
        return `Unknown command: ${command}\nType 'help' for available commands.`;
    }
  }

  private static handleCodeCommand(args: string[]): string {
    const subCommand = args[0] || 'check';

    switch (subCommand) {
      case 'check':
      case 'test':
        return this.runCodeQualityCheck();
      case 'standards':
        return this.showCodingStandards();
      case 'report':
        return this.generateFullReport();
      default:
        return `Code command usage:
- 'code check' or 'code test' - Run code quality check
- 'code standards' - Show coding standards summary
- 'code report' - Generate detailed quality report`;
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
    const results = codeQualityChecker.checkProject();
    
    let output = `\n🔍 Code Quality Check Results\n`;
    output += `================================\n\n`;
    
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
    
    output += `📊 **Overall Score:** ${averageScore.toFixed(1)}/100\n`;
    output += `📋 **Files Checked:** ${results.length}\n`;
    output += `⚠️ **Issues Found:** ${totalIssues}\n\n`;
    
    if (averageScore >= 90) {
      output += `🎉 **Excellent!** Your code follows best practices.\n\n`;
    } else if (averageScore >= 75) {
      output += `✅ **Good work!** Minor improvements possible.\n\n`;
    } else {
      output += `📈 **Room for improvement** - see details below.\n\n`;
    }

    results.forEach((result, index) => {
      if (result.issues.length > 0) {
        output += `📄 **${result.fileName}** (Score: ${result.score}/100)\n`;
        
        result.issues.slice(0, 2).forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
          output += `  ${icon} ${issue.message}\n`;
        });
        
        if (result.issues.length > 2) {
          output += `  ... and ${result.issues.length - 2} more issues\n`;
        }
        output += `\n`;
      }
    });

    output += `\n📋 **Quick Actions:**\n`;
    output += `• Type 'code report' for detailed analysis\n`;
    output += `• Type 'test run ui-ux' to test user experience\n`;
    output += `• Type 'standards' to review best practices\n`;

    return output;
  }

  private static generateFullReport(): string {
    const results = codeQualityChecker.checkProject();
    return codeQualityChecker.generateDetailedReport(results);
  }

  private static runTestSuite(suiteName: string): string {
    const tests = testRunner.runTestSuite(suiteName);
    
    if (tests.length === 0) {
      return `❌ No tests found for suite: ${suiteName}\nUse 'test list' to see available suites.`;
    }

    let output = `\n🧪 Test Suite: ${suiteName}\n`;
    output += `================================\n\n`;

    tests.forEach((test, index) => {
      output += `${index + 1}. **${test.name}**\n`;
      output += `   📝 ${test.description}\n`;
      output += `   🏷️ Category: ${test.category}\n\n`;
      output += `   **Steps to test:**\n`;
      test.steps.forEach((step, stepIndex) => {
        output += `   ${stepIndex + 1}. ${step}\n`;
      });
      output += `\n   ✅ **Expected:** ${test.expectedResult}\n`;
      output += `   📊 **Result:** Mark as PASS ✅ or FAIL ❌\n\n`;
    });

    return output;
  }

  private static listTestSuites(): string {
    const suites = testRunner.getAllTestSuites();
    
    let output = `\n📋 Available Test Suites:\n`;
    output += `==========================\n\n`;
    
    suites.forEach((suite, index) => {
      const tests = testRunner.getTestSuite(suite);
      const description = this.getTestSuiteDescription(suite);
      output += `${index + 1}. **${suite}** (${tests.length} tests)\n`;
      output += `   ${description}\n\n`;
    });
    
    output += `**Usage:** 'test run [suite-name]'\n`;
    output += `**Example:** 'test run component-functionality'\n`;

    return output;
  }

  private static getTestSuiteDescription(suiteName: string): string {
    const descriptions: Record<string, string> = {
      'component-functionality': 'Tests basic component rendering and interactions',
      'ui-ux': 'Tests user interface and user experience elements',
      'accessibility': 'Tests accessibility features and compliance'
    };
    return descriptions[suiteName] || 'Manual testing suite';
  }

  private static showStandards(): string {
    return `\n📖 Project Standards Overview\n` +
           `=============================\n\n` +
           `📁 **Project Structure:**\n` +
           `• Components: One per file, <100 lines\n` +
           `• Hooks: Custom logic in /hooks\n` +
           `• Utils: Helper functions in /utils\n` +
           `• Types: TypeScript interfaces for props\n\n` +
           `⚡ **Function Standards:**\n` +
           `• Descriptive names (min 3 characters)\n` +
           `• Single responsibility principle\n` +
           `• Proper TypeScript typing\n` +
           `• Early returns to reduce nesting\n\n` +
           `🧪 **Testing Standards:**\n` +
           `• Test user behavior, not implementation\n` +
           `• Manual testing checklists\n` +
           `• Accessibility testing\n` +
           `• Responsive design verification\n\n` +
           `💡 **Run 'code standards' for full documentation**`;
  }

  private static showStructure(): string {
    return `\n🏗️ Project Structure Guide\n` +
           `==========================\n\n` +
           `src/\n` +
           `├── components/     # Reusable UI components\n` +
           `│   ├── ui/        # Base components (shadcn/ui)\n` +
           `│   └── *.tsx      # Custom components\n` +
           `├── pages/         # Route-based components\n` +
           `├── hooks/         # Custom React hooks\n` +
           `├── utils/         # Helper functions\n` +
           `├── data/          # Static data\n` +
           `└── lib/           # External configurations\n\n` +
           `📝 **Naming Conventions:**\n` +
           `• Components: PascalCase.tsx\n` +
           `• Hooks: use-kebab-case.tsx\n` +
           `• Utils: camelCase.ts\n\n` +
           `💡 **See PROJECT_STRUCTURE.md for details**`;
  }

  private static showCodingStandards(): string {
    return `\n📖 Coding Standards Summary\n` +
           `===========================\n\n` +
           `🎯 **Component Guidelines:**\n` +
           `• Keep components under 100 lines\n` +
           `• Use TypeScript interfaces for props\n` +
           `• One component per file\n` +
           `• Default exports for components\n\n` +
           `📦 **Import Organization:**\n` +
           `1. React & external libraries\n` +
           `2. UI components\n` +
           `3. Custom components\n` +
           `4. Utils & types\n\n` +
           `🔧 **Function Best Practices:**\n` +
           `• Descriptive naming\n` +
           `• Single responsibility\n` +
           `• Pure functions when possible\n` +
           `• Proper error handling\n\n` +
           `📋 **See CODING_STANDARDS.md for full guide**`;
  }

  private static showHelp(): string {
    return `\n🛠️ Available Commands\n` +
           `====================\n\n` +
           `🔍 **Code Quality:**\n` +
           `• 'codeTest()' or 'code test' - Quick quality check\n` +
           `• 'code report' - Detailed quality analysis\n` +
           `• 'code standards' - View coding guidelines\n\n` +
           `🧪 **Testing:**\n` +
           `• 'test run [suite-name]' - Run manual tests\n` +
           `• 'test list' - Show available test suites\n\n` +
           `📚 **Documentation:**\n` +
           `• 'standards' - Project standards overview\n` +
           `• 'structure' - Project structure guide\n` +
           `• 'help' - Show this help menu\n\n` +
           `🚀 **Quick Start:**\n` +
           `• Try: codeTest()\n` +
           `• Try: test run ui-ux\n` +
           `• Try: standards`;
  }
}

// Enhanced helper functions for easy command execution
export const runCodeCommand = (command: string): Promise<string> => {
  return CodeCommands.runCommand(command);
};

// Enhanced console integration for development
if (typeof window !== 'undefined') {
  // Main function for code testing
  (window as any).codeTest = (command?: string) => {
    const cmd = command || 'code test';
    runCodeCommand(cmd).then(result => {
      console.log(result);
    });
  };
  
  // Quick access functions
  (window as any).showCodeHelp = () => {
    runCodeCommand('help').then(result => {
      console.log(result);
    });
  };

  (window as any).codeReport = () => {
    runCodeCommand('code report').then(result => {
      console.log(result);
    });
  };

  (window as any).testUI = () => {
    runCodeCommand('test run ui-ux').then(result => {
      console.log(result);
    });
  };

  (window as any).showStandards = () => {
    runCodeCommand('standards').then(result => {
      console.log(result);
    });
  };

  // Helpful startup message
  console.log(`
🚀 Code Quality System Ready!

Quick Commands:
• codeTest() - Run quality check
• codeReport() - Detailed analysis  
• testUI() - Test user interface
• showStandards() - View standards
• showCodeHelp() - Full help menu

Try: codeTest()
  `);
}
