# TOdar_BOOK

**TOdar_BOOK**은 todolist 형식의 ui와 calendar(달력)처럼 일정을 관리하며 책을 읽는다는 의미로 **TO**<del>dolist</del>+<del>Calen</del>**dar** + **BOOK** = **TOdarBOOK**으로 네이밍이 되었습니다.

# TOdar_BOOK, 이거 쓸 수 있는 건가요?

우선적으로 이 프로젝트는 실제로 사용이 가능한 프로젝트가 아닌 개인 공부용으로 만들어본 프로젝트입니다.

**TOdar_BOOK**의 목적은 목차가 있는 학습 전용 서적을 타켓팅하여 책을 읽을때 각 목차마다 일정 또는 기간을 정해놓고 학습 및 독서를 체계적으로 할 수 있게 도와주는 것입니다.

하지만 책의 목차를 조회할 수 있는 마땅한 방법을 찾지 못해 이 프로젝트에서 가장 중요한 목차 데이터는 **Mock Data**로 구성이 되어있으며 추가한 모든 책에 동일한 내용의 목차 데이터가 들어 있습니다.
(책의 목차를 조회하는 api를 찾지 못하여 가짜로 목차 데이터를 생성하는 함수를 만들어 임시로 대체했습니다.)

목차를 조회할 수 있는 방법이나 api가 생긴다면 바로 대체할 것입니다.

# TOdar_BOOK 만드려는 기능

- 책 정보(제목, 저자, 썸네일, 줄거리) 조회 ⭕️
- 읽고 싶은 책 추가 ⭕️
- 읽은 책들의 정보(읽기 시작한 날짜, 다 읽은 날짜) 조회 ⭕️
- 책에서 읽은 목차들 체킹 ⭕️
- 책의 목차 뷰를 모달로 구현 ⭕️
- 책들의 진도율을 그래프로 구현 ❌
- 책의 실제 목차 데이터 조회 ❌
- 독서록 기능 구현 ❌
- 읽은 목차들을 달력 뷰로 구현 ❌

# TOdar_BOOK에서 사용한 기술

- **프론트엔드** 🌈
  - React.js
    - Redux
    - Bootstrap
- **백엔드** 🌨
  - Node.js
    - Express.js
    - Sequelize
    - jwt(JSON Web Token)
- **데이터베이스** 📂
  - MySQL

