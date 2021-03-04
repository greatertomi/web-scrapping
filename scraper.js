const puppeteer = require('puppeteer');
const util = require('util');
const db = require('./database');
const query = util.promisify(db.query).bind(db);
// const url = 'https://sts.smartlearninguk.com/all-courses/';
// const url = 'https://sts.smartlearninguk.com/beginner/';
// const url = 'https://sts.smartlearninguk.com/intermediate/';
const url = 'https://sts.smartlearninguk.com/advanced/';

const scrape = async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url);

  const courses = await page.evaluate(() => {
    let courseList = document.querySelectorAll('h3.entry-title');
    let contentList = document.querySelectorAll('p.entry-content');
    let courseArr = [];

    for (let i = 0; i < courseList.length; i++) {
      courseArr[i] = {
        title: courseList[i].innerText.trim(),
        content: contentList[i].innerText.trim()
      };
    }
    return courseArr;
  });

  console.log('courses', courses);
  const queries = [];
  for (const course of courses) {
    queries.push(
      query('insert into courses (title, content, level) values (?, ?, ?)', [
        course.title,
        course.content,
        'advanced'
      ])
    );
  }
  await Promise.all(queries);
  console.log('Inserted into DB');
};

scrape();
