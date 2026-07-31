module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/step_definitions/**/*.ts', 'features/support/**/*.ts'],
    paths: ['features/**/*.feature'],
    format: [
      'progress-bar',
      'summary',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true,
    timeout: 60000
  }
};