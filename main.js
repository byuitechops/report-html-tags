/**********************************************************************************************
 * In D2L files can have <style> and <script> tags in the html, however Canvas only keeps 
 * whatever is in the body tag and gets rid of the <style> and <script> tags. These tags 
 * might include important code for the course, so it is necessary to report which files had 
 * the tags to track if anything needs to be modified in Canvas because of the missing tags 
 **********************************************************************************************/

const canvas = require('canvas-wrapper');
const cheerio = require('cheerio');

module.exports = (course, stepCallback) => {
    /***************************************************************************
     * 	findTags()				  
     *  Parameters: none
     *  Description: Determine if there are script or style tags in each html
     *  file in the course. If there are script or style tags, log them.
     ***************************************************************************/
    function findTags() {
        var files = [];

        /* Get the contents of each html file */
        course.content.forEach(file => {
            if (/(.html)$/i.test(file.name)) {
                files.push(file);
            }
        });

        /* If no html files were found, stop the child module */
        if (files.length === 0) {
            course.warning('Couldn\'t locate any html files for this course.');
            stepCallback(null, course);
            return;
        }

        /* Loop through each file to check its contents for script and style tags */
        files.forEach(file => {
            var logObj = {
                'File Name': file.name,
                'Script Tags': 'None',
                'Style Tags': 'None',
            };
            
            /* If a script tag exists, add it to the log object */
            if (file.dom('script').html()) {
                logObj["Script Tags"] = file.dom('script').html();
            }

            /* If a style tag exists, add it to the log object */
            if (file.dom('style').html()) {
                logObj["Style Tags"] = file.dom('style').html();
            }

            /* If either tag exists, log it with the file name*/
            if (file.dom('script').html() || file.dom('style').html()) {
                course.log(`Report Script and Style Tags`, logObj);
            }
        });

        stepCallback(null, course);
    }

    /**********************************************
     * 				START HERE					  *
     **********************************************/
    findTags();
};