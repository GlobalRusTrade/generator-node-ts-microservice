'use strict';
const Generator = require('yeoman-generator');
const lodash = require('lodash');

module.exports = class extends Generator {

  prompting() {
    this.log(`Deploy included in your project's deployment process`);
  }

  writing() {
    const packageName = this.config.get('packageName');

    const mapping = [
      ['build.xml'],
      ['environment/supervisor/packageName.prod.conf', `environment/supervisor/${packageName}.prod.conf`],
      ['environment/supervisor/packageName.qa.conf', `environment/supervisor/${packageName}.qa.conf`],
    ];

    const params = {
      packageName,
      optFolderName: this.config.get('optFolderName'),
      shortProjectName: this.config.get('shortProjectName'),
    };

    mapping.forEach(([template, destination]) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(destination ? destination : template),
        params
      );
    });

  }

};
