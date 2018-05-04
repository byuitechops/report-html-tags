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
            var $ = cheerio.load(file.dom('*').html());
            var scriptTags = $('script').get();
            var styleTags = $('style').get();

            var logObj = {
                'File Name': file.name,
                'Script Tags': 'None',
                'Style Tags': 'None',
            };

            /* If a script tag exists, add it to the log object */
            if (scriptTags.length !== 0) {
                var logScript = '';
                scriptTags.forEach(tag => {
                    if ($(tag).attr('src')) {
                        logScript += `\n<script src="${$(tag).attr('src')}"></script>`;
                    } else if ($(tag).html()) {
                        logScript += `\n<script>${$(tag).html()}</script>`;
                    }
                });

                /* Write the script tags to the 'Script Tags' attribute on the log object */
                logObj["Script Tags"] = logScript;
            }

            /* If a style tag exists, add it to the log object */
            if (styleTags.length !== 0) {
                /* There should only ever be one <style> tag, but loop throug just in case */
                styleTags.forEach(tag => {
                    logObj["Style Tags"] = $(tag).html();
                });
            }

            /* If either tag exists, log it with the file name*/
            if (scriptTags.length !== 0 || styleTags.length !== 0) {
                course.log(`Use to Contain Script or Style Tags`, logObj);
            }
        });

        stepCallback(null, course);
    }

    /**********************************************
     * 				START HERE					  *
     **********************************************/
    findTags();
};