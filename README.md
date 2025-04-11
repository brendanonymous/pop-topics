TODO:

- [x] write golang scraper logic
  - [x] fix data duplication bug
- [x] write golang API
- [x] put up backend on ec2
  - [x] configure systemd and nginx on server
  - [ ] backend stops serving randomly, figure out if there is rate limiting or similar
- [ ] fix git hook issue
- [ ] unit tests
- [ ] makefile
- [ ] cronjob
- [ ] frontend
  - [x] write fetch call and dynamically create components from json
  - [x] find sizing formula for bubbles depending on search volume and growth
  - [x] use physics library to animate bubbles
  - [ ] magnify bubbles on mouse hover
  - [x] reduce server load - create a client-side cache (local storage) to store data, use timestamp, if 24 hours has passed, get new data and store in cache
    - [ ] test
