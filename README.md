# 🧇 Waffle5gram (web)

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [개발팀](#개발팀)
3. [기술 스택](#기술-스택)
4. [배포](#배포)

## 프로젝트 소개

- [와플5그램](https://waffle5gram.com/)은 2023 와플스튜디오 Rookies 세미나에서 학습한 내용을 토대로 널리 사용되는 SNS인 [인스타그램](https://www.instagram.com/) 서비스를 클론 코딩하는 프로젝트입니다.
- 로그인 및 회원가입, 소셜 로그인, 피드 및 댓글 작성, 좋아요 생성 및 삭제, 및 탐색 등 인스타그램 서비스의 기본 기능을 구현하였습니다.
- 추가로 탐색 탭의 아쉬웠던 기존 기능을 보완하기 위해 키워드 기반 주제별 탐색 기능을 추가하였습니다.
- 개발 기간 : 23.12.28 ~ 24.02.02
- BACKEND 레포 : [team5-server](https://github.com/wafflestudio21-5/team5-server)

## 개발팀

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

## 기술 스택

![Static Badge](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![Static Badge](https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=spring&logoColor=white)
![Static Badge](https://img.shields.io/badge/styledcomponents-%23DB7093.svg?style=for-the-badge&logo=styledcomponents&logoColor=white)
![Static Badge](https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)
![Static Badge](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white)
![Static Badge](https://img.shields.io/badge/Husky-%234479A1.svg?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/LintStaged-%236DB33F.svg?style=for-the-badge)

## 배포

- 배포 URL : www.waffle5gram.com
- 배포 방식 : aws s3, cloudfront, route53 이용. Github actions 이용해서 main에 merge 시 빌드 + 배포
- Test ID : user-n (n = 0, 1, 2)
- Test PW : password-n (n = 0, 1, 2)

## 주요 기능
