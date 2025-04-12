TODO:

- [x] write golang scraper logic
  - [x] fix data duplication bug
- [x] write golang API
- [x] put up backend on ec2
  - [x] configure systemd and nginx on server
  - [x] backend stops serving randomly, figure out if there is rate limiting or similar
- [ ] fix git hook issue
- [ ] unit tests
- [ ] makefile
- [ ] frontend
  - [x] write fetch call and dynamically create components from json
  - [x] find sizing formula for bubbles depending on search volume and growth
  - [x] use physics library to animate bubbles
  - [ ] magnify bubbles on mouse hover
    - [ ] add smooth magnification animation
    - [ ] add rigid body so each bubble shoves other bubbles out of the way (is this worth it?)
    - [ ] set a max magnification level
  - [ ] create clickable links on each bubble
    - [ ] just reroute to a google search, hope this is easy
  - [x] reduce server load - create a client-side cache (local storage) to store data, use timestamp, if 24 hours has passed, get new data and store in cache
    - [x] test
