# 🧇 Waffle5gram (web)

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [배포 링크](#배포-링크)
3. [팀원 구성](#팀원-구성)
4. [서비스 소개 페이지](#서비스-소개-페이지)
5. [사용 기술](#사용-기술)
6. [서버 구성도](#서버-구성도)
7. [ERD](#erd)
8. [사용한 컨벤션](#사용한-컨벤션)

---

## 프로젝트 소개

- 2023 와플스튜디오 Rookies 세미나에서 학습한 내용을 토대로 널리 사용되는 SNS인 인스타그램 서비스를 클론 코딩하는 프로젝트의 웹 서버입니다.
- 프로젝트 기간과 목적을 고려하여 다음과 같은 필수 스펙을 우선적으로 구현하였습니다.
- [x] 회원가입 / 로그인 / 소셜 로그인
- [x] 유저 계정 페이지
- [x] 글 작성 / 댓글 작성
- [x] 페이지네이션
- [x] AWS 배포
- [x] HTTPS 설정
- [x] GITHUB Actions CI/CD
- 또한 기존에 없던 새로운 기능으로 검색 파트에서 인물 검색과 게시물 검색을 분리, 카테고리를 바탕으로 피드를 생성해주는 탭을 추가하였습니다.
- 이외에 조금 더 비슷한 구현을 위해 좋아요 기능, 게시물 저장 기능, 피드 기능, 팔로우 기능, 검색 기능을 추가하였습니다.
- BACKEND 레포 : [team5-server](https://github.com/wafflestudio21-5/team5-server)

## 팀원 구성

<table>
    <tr>
        <td></td>
        <td>최재웅</td>
        <td>송원영</td>
        <td>김상협</td>
    </tr>
    <tr>
        <td>Github</td>
        <td><a href="https://github.com/jwchoi-kr"><img src="https://avatars.githubusercontent.com/u/134821071?v=4" width="150"></a></td>
        <td><a href="https://github.com/onezero01010"><img src="https://avatars.githubusercontent.com/u/102233668?v=4" width="150"></a></td>
        <td><a href="https://github.com/james20140802"><img src="https://avatars.githubusercontent.com/u/33197890?v=4" width="150"></a></td>
    </tr>
    <tr>
        <td>Contribution</td>
        <td>
            <li>프론트 조장</li>
            <li>AWS 및 배포 관리</li>
            <li>프로필 페이지</li>
            <li>유저 관련 기능</li>
        </td>
        <td>
            <li>회원 가입</li>
            <li>로그인, 소셜 로그인</li>
            <li>탐색 페이지</li>
        </td>
        <td>
            <li>피드 페이지</li>
            <li>포스트, 댓글 관련 기능</li>
            <li>탐색 상세 페이지</li>
        </td>
    </tr>
</table>

## 배포 링크

- 배포링크 : https://api.waffle5gram.com
- 배포 방식 : aws s3, cloudfront, route53 이용. Github actions 이용해서 main에 merge 시 빌드 + 배포

## 서비스 소개 페이지

[Notion Link](https://ancient-vinyl-ddb.notion.site/a2b526a9c9a84c8da75b6d403cbbb410?pvs=4)

## 사용 기술

![Static Badge](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![Static Badge](https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=spring&logoColor=white)
![Static Badge](https://img.shields.io/badge/styledcomponents-%23DB7093.svg?style=for-the-badge&logo=styledcomponents&logoColor=white)

### Code Convention

- 팀원 간 코드 스타일을 맞추고 가독성을 높여 코드 리뷰를 원활하게 하기 위해 ESLint를 사용하였습니다.
- 제일 많이 쓰이는 Prettier를 사용하였습니다.
- Github Action 을 이용하여 main 브랜치에 PR 올릴때마다 자동으로 스타일 검사를 하도록 설정하였습니다.

### Commit Convention

- 아래와 같은 커밋 컨벤션을 통해 서로의 작업물이 어떤 유형의 것인지 파악하기 쉽도록 하였습니다.

### Git Branch & merge 전략

- 토이 프로젝트의 성격을 고려하여 간단한 Branching 전략인 Github-flow를 사용했습니다.
- 또한, develope 브랜치의 중요도를 고려하여 깔끔한 history를 위해 Squash Merge를 사용했습니다.
