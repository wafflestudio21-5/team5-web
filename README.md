# 🧇 Waffle5gram (web)

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [배포](#배포)
4. [팀원 구성](#팀원-구성)

---

## 주의사항

1. PR 올리기 전 Prettier, ESLint 적용 (huksy setting 잘 되어 있으면 알아서 됨)
2. 바로 빌드할 수 있도록 웬만하면 에러 처리 or 주석 후 PR 올리기 (혹시 몰라서 강제는 안함)
3. PR 올릴 때, dev branch로 merge할 때 각각 slack에 말하기 + 변경 사항 바로바로 받아오기
4. 웬만하면 24시간 안에 PR 확인하고 comment 달기

## 프로젝트 소개

- 2023 와플스튜디오 Rookies 세미나에서 학습한 내용을 토대로 널리 사용되는 SNS인 인스타그램 서비스를 클론 코딩하는 프로젝트입니다.
- 로그인 및 회원가입, 소셜 로그인, 피드 및 댓글 작성, 좋아요 생성 및 삭제, 알림 및 탐색 등 인스타그램 서비스의 기본 기능을 구현하였습니다. (+DM, 스토리, 릴스, ...)
- 추가로 탐색 탭의 아쉬웠던 기존 기능을 보완하기 위해 결과 정렬(좋아요 순, 최신순, 댓글 많은 순 등등), 키워드 기반 주제별 탐색 기능을 추가하였습니다.

## 기술 스택

- React
- TypeScript
- Styled-component
- ESLint, Prettier, Husky, Lint-staged

## 배포

- 배포 URL : www.waffle5gram.com
- 배포 방식 : aws s3, cloudfront, route53 이용. Github actions 이용해서 main에 merge 시 빌드 + 배포
- Test ID : user-n (n = 0, 1, 2)
- Test PW : password-n (n = 0, 1, 2)

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
            <li>AWS 및 배포 관리</li>
            <li>프로필 페이지</li>
            <li>유저 관련 기능</li>
        </td>
        <td>
            <li>회원 가입</li>
            <li>로그인, 소셜 로그인</li>
        </td>
        <td>
            <li>피드 페이지</li>
            <li>포스트 관련 기능</li>
        </td>
    </tr>
</table>
