module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-watch");

  const releaseRoot = "./build";

  grunt.initConfig({
    clean: {
      build: ["build"],
      webextension: ["build/infovis"],
      release: {
        src: [releaseRoot],
        options: {
          force: true
        }
      }
    },
    watch: {
      files: ["Gruntfile.js", "src/**/*.js"],
      tasks: "watchTask"
    },
    compress: {
      webextension: {
        options: {
          archive: "build/infovis.zip"
        },
        files: [{
          expand: true,
          cwd: "build/infovis",
          src: ["src/*"],
          dest: "build"
        }]
      }
    },
  });

  grunt.registerTask("watchTask", () => {
    grunt.task.run("build");
  });

  grunt.registerTask("build:webextension", () => {
    grunt.file.recurse("src", (abspath, rootdir, subdir, filename) => {
      subdir = subdir ? `${subdir}/` : "";
      grunt.file.copy(abspath, `build/infovis/${subdir}${filename}`);
    });

    grunt.task.run("compress:webextension");
  });

  grunt.registerTask("build", ["clean", "build:webextension"]);
  grunt.registerTask("publish", ["clean:release", "build", "copy:release"]);
  grunt.registerTask("default", ["build"]);
};
