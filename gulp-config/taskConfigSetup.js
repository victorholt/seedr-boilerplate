/* jshint node:true, laxbreak: true */
'use strict';

///////////////////////////////////////////////////////////////////////////
// Required modules.
///////////////////////////////////////////////////////////////////////////
var path = require('path');
var fs = require('fs');

///////////////////////////////////////////////////////////////////////////
// TaskRunner Class
///////////////////////////////////////////////////////////////////////////

/**
 * This class uses a given set of tasks and initializes/runs
 * them.
 *
 * @class TaskConfigSetup
 * @param {String} baseDir
 * @param {Array<String>} tasks
 * @constructor
 */
var TaskConfigSetup = function(baseDir, gulp, buildEnv, tasks) {
    /**
     * The base directory string for the project.
     *
     * @property baseDir
     * @type {String}
     */
    this.baseDir = baseDir;

    /**
     * The GulpJS object.
     *
     * @default null
     * @property {gulp}
     * @type {gulp}
     */
    this.gulp = gulp;

    /**
     * The build environment info.
     *
     * @default null
     * @property buildEnv
     * @type {object}
     */
    this.buildEnv = buildEnv;

    /**
     * An array of file names representing the
     * task and ordering in which to run them.
     *
     * @property tasks
     * @type {Array}
     */
    this.tasks = tasks;

    // Initialize the task runner.
    this.init();
};

var proto = TaskConfigSetup.prototype;

/**
 * Runs the tasked based upon the ordering of the
 * tasks array.
 *
 * @method init
 * @returns void
 * @throws exception<String>
 */
proto.init = function() {
    var i = 0;
    var GulpTask = null;
    var taskObj = null;

    if (this.tasks == null ||
        !Array.isArray(this.tasks) ||
        this.tasks.length === 0) {
        throw 'No tasks found!';
    }

    for (; i < this.tasks.length; i++) {
        var taskFile = this.tasks[i];
        var filePath = path.join(this.baseDir, 'gulp-config/' + taskFile + '.js');

        // Check if our file exists.
        if (!fs.existsSync(filePath)) {
            throw 'Task file not found: ' + filePath;
        }

        // Run the task.
        GulpTask = new require(filePath);
        taskObj = new GulpTask(this.gulp, this.buildEnv);
    }
};

///////////////////////////////////////////////////////////////////////////
// Export object
///////////////////////////////////////////////////////////////////////////
module.exports = TaskConfigSetup;
