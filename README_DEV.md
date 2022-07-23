# PlanetScale DB

[planetscale cli 공식문서](https://github.com/planetscale/cli)

위 문서 참고해서 cli 설치

```
<!-- 어떤 명령어가 가능한지 보기 -->
pscale

<!-- 로그인. 관리자 권한을 받아야 우리 DB 에 접근 가능 -->
pscale auth login

<!-- knock-knock 데이터베이스와 보안터널 생성 -->
pscale connect knock-knock
<!-- 연결시 DB 브랜치를 지정할 수도 있음 -->
pscale connect knock-knock develop
```

# Prisma

PlanetScale 데이터베이스는 mysql compatible database 로, mysql 은 아니지만 호환 가능한 DB

그래서 mysql 과 같은 일반적인 RDB 와 다른 점이 있는데, 그 중 하나가 foreign key 가 실제로 존재하는 건지 확인을 안 한다. 따라서 DB 단이 아닌 Prisma 가 대신 확인하도록 해야 한다. 그게 `schema.prisma` 에 있는 referentialIntegrity 관련 설정

```
<!-- schema.prisma 기반으로 db 업데이트 -->
npx prisma db push

<!-- 디비 관리자 패널 웹버전 열기 -->
npx prisma studio

<!-- 스키마 기반 백엔드에서 사용할 타입 생성 -->
npx prisma generate
```
