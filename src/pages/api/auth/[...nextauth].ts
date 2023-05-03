import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
    //   scope: 'repo', // Request access to user's repositories
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET as string
}

export default NextAuth(authOptions)