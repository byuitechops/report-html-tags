# Report Html Tags
### *Package Name*: report-html-tags
### *Child Type*: pre import
### *Platform*: all
### *Required*: Recommended

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

In D2L files can have `<style>` and `<script>` tags in the html, however Canvas only keeps whatever is in the body tag and gets rid of the `<style>` and `<script>` tags. These tags might include important code for the course, so it is necessary to report which files had the tags to track if anything needs to be modified in Canvas because of the missing tags.

## How to Install

```
npm install report-html-tags
```

## Run Requirements

There should be html files on `course.content`, however the child module will handle it if there aren't any. 

## Options

None

## Outputs

None

## Process

1. Get each html file in the course from `course.content`
2. Loop through each files' html and look for `<script>` tags and `<style>` tags
3. If any are found, log them

## Log Categories

- Report Script and Style Tags

## Requirements

The child module needs to report all of the `<script>` and `<style>` tags in the course. 