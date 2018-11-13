# WelcoME

[![Build Status](https://img.shields.io/travis/com/code4romania/code4.ro/master.svg?style=for-the-badge)](https://travis-ci.org/code4romania/WelcoME) [![GitHub contributors](https://img.shields.io/github/contributors/code4romania/WelcoME.svg?style=for-the-badge)](https://github.com/code4romania/WelcoME/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/WelcoME.svg?style=for-the-badge)](https://github.com/code4romania/WelcoME/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

Communication and information exchange are highly important within vulnerable groups. In many cases, a constant flow of information is essential for the survival of group members or for their access to jobs, support or necessary assistance. Moreover, this flow of information needs to happen in a safe and secure setting.

WelcoME is a social network built with the needs of vulnerable groups in mind. The platform will offer:

* a closed safe space for members of the group to interact and exchange information
* access to content that is curated for their needs
* moderator and community-organiser roles embedded within the platform
* customisable roles within the platform for relevant external actors (doctors, specialised assistants etc.)

We started working on WelcoME out of the wish to offer refugees a safe space where to exchange information, interact with their support groups and access assistance and jobs. We soon realised that the same need is shared by various vulnerable groups, be it disabled people, persons suffering from certain diseases or complications, mutual aid fellowships etc.

[Built with](#built-with) | [Deployment](#deployment) | [Contributing](#contributing) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)

## Built With

###  Node js
 https://nodejs.org
 
### Git
 https://git-scm.com
 
### yarn (optional) 
 https://yarnpkg.com
 
### React storybook
 https://storybooks.js.org/

## Deployment

### Installation
* `git clone https://github.com/code4romania/WelcoME.git`
* `cd WelcoME`
* `cd www`
* `npm i _or_ yarn`
* `cd ../functions`
* `npm i _or_ yarn`

### Run
* `cd www`
* `npm start _or_ yarn start`

### Storybook
* `cd www`
* `npm run storybook _or_ yarn run storybook`

install web:
`cd www && npm install`

install functions
`cd functions && npm install`

run web:
`cd www && npm start`
and go to:
http://localhost:3000
react guide:
https://blog.tighten.co/react-101-building-a-gif-search-engine

test web:
`cd www && npm run test`

run mobile:
`cd mobile && npm start`

test mobile:
`cd mobile && npm test`

test functions
`cd functions && npm run test`


deploy functions:
`cd functions && npm run deploy`

build web:
`cd www && npm run build`

deploy web:
`cd www && npm run deploy`


### Code linter

https://github.com/feross/standard

### Deployment

Firebase through Travis, see `travis.yml`.

## Contributing

If you would like to contribute to one of our repositories, first identify the scale of what you would like to contribute. If it is small (grammar/spelling or a bug fix) feel free to start working on a fix. If you are submitting a feature or substantial code contribution, please discuss it with the team and ensure it follows the product roadmap.

* Fork it (https://github.com/code4romania/WelcoME/fork)
* Create your feature branch (git checkout -b feature/fooBar)
* Commit your changes (git commit -am 'Add some fooBar')
* Push to the branch (git push origin feature/fooBar)
* Create a new Pull Request

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread accross 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
