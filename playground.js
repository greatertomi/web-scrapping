const insertIntoDb = async () => {
  const courses = [
    {
      title: 'Course1',
      content: 'Smart Contract1'
    },
    {
      title: 'Course2',
      content: 'Smart Contract2'
    }
  ];

  const queries = [];
  for (const course of courses) {
    queries.push(
      query('insert into courses (title, content, level) values (?, ?, ?)', [
        course.title,
        course.content,
        'all'
      ])
    );
  }
  await Promise.all(queries);
  console.log('Data Inserted!');
};

insertIntoDb();
