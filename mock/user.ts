import { MockMethod } from "vite-plugin-mock"
import {
    successResult,
    errorResult,
    pageSuccessResult,
    requestParams,
    getRequestToken
} from "@/utils/result"
import { isLogin, getToken, TokenPrefix } from '@/utils/auth'

export function createFakeUserList() {
    return [
        {
            user_id: '3306',
            user_name: 'xhadmin',
            real_name: 'xhyc',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiMwMGEwOGQ7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZTZiODc2OyIvPjxwYXRoIGQ9Im0xNDEuNzUgMTk1YTExNC43OSAxMTQuNzkgMCAwIDEgMzggMTYuNSAxMTUuNTMgMTE1LjUzIDAgMCAxLTEyOC40NiAwIDExNC43OSAxMTQuNzkgMCAwIDEgMzgtMTYuNWMwIDEwLjc2IDExLjc1IDE5LjQ4IDI2LjI1IDE5LjQ4czI2LjI1LTguNzIgMjYuMjUtMTkuNDh6IiBzdHlsZT0iZmlsbDojZDEyODIzOyIvPjxwYXRoIGQ9Im0xMDguMzcgMjIuMDE5Yy02LjI2OTgtMTIuODI5LTE3LjE1MS0xMy4zOTYtMTguOTQ5IDEuMTc2OS0xMS40NDgtOS40NTgzLTI2LjAyMS00LjQ4My0yMC4zNjEgMTIuNDIyLTEyLjI1MS03LjkyODItMjQuOTE5IDEuNzc2MS0xNy4wNzYgMjAuODUzLTI3LjA4IDIuMzY0Ni0yMi43MTUgMjQuNzI2LTEwLjExMSAzMS40MzUtOS45MDAyIDMuMzU2Ni0xMC43MDEgOS40MDA2LTguNDY0IDE0LjQ5NyAyLjY1NzQgNC43ODQyIDkuMDEyNiA2LjQ3MzcgMTEuNTQ1IDkuNjUxOS02LjYyNCAwLjU5NDE5LTguNDExMiA1LjYwMTEtNS43NDA0IDkuNTE5MiAxLjY4OTYgMi40Nzg3IDUuMjc1NiA0LjIyMTggOC41OTcxIDUuNTQ1NSAxLjA0ODUgMC40MDY1OCAzLjcwMiAxLjI3MzIgMy45MDUzIDIuNDE4MSAwLjE4NzQ0IDEuMjE1Ni02Ljc4ODQgMy4wMDU1LTUuNzI4MSA1LjI2MTIgMC42MDY0OCAxLjQyMjcgMS43NzY0IDIuNzE1MSAyLjY0NjYgMy43MTU2IDEuMjgwNyAxLjY1OTUgMTAuNzU1IDguMDM1MSA5LjQ1ODMgNC4yMDQ5LTEuMDI3MS0zLjcyMzQtMi4yMTQ4LTcuNDY4Mi0zLjE0NTYtMTEuMTkyLTEuMTY2Mi01LjMwNjktMS43ODY4LTEwLjcyMS0xLjEwMi0xNi4xNTYgMS40MjIzLTUuNDU1IDUuMDY5LTQuNDI2NSA3Ljc4MzctOC4zNTg4IDMuNTI2NC01Ljc1MDUgMi4wMjk2LTExLjYxNCAyLjEyNC0xMy41NzUgMC4xMDctMS43ODY4IDEuNTQwNy0xLjE4NzYgMy4xODg0LTEuNDMzNyA0LjM4NjgtMC42NDE5NiA3LjAwODEtMi4xMTg1IDguODM3Ny02LjI2OTggMC43NzAzNS0xLjkyNTkgMC42MjA1Ny05Ljc1NzggMC41MjQyNi0xMS43OCAwLjM2Mzc4LTQuNjMyOCA0LjE4MzUgMCA2LjU0OCAwLjY0MTk2IDMuMjYzMyAwLjg4ODA1IDYuODc5NyAwLjIxMzk5IDkuMDczMS0yLjUwMzcgMS43NTQ3LTIuMzc1MyAyLjA4NjQtMi44ODg4IDQuNjExNC0wLjgwMjQ1IDIuNjg1NiAyLjIxNDggNC4wOTc5IDMuMTM0OSA3LjY5MjkgMy4yNzQgNS41NjM3IDAuMjAzMjkgOC43NzM1LTYuMjY5OCAxMS4zMi01LjYzODYgMy41MjAxIDAuODc3MzUgMy42MDU3IDUuNDU2NyAxMC4yNjEgNC44NjgyIDIuMzg2LTAuMjAzMjkgMy44MzA0LTAuODY2NjUgNS40MDMyLTIuNjQyOCAwLjg4ODA1LTAuOTk1MDUgMS45NTgtMi41MDM3IDMuNDM0NS0yLjYyMTQgMS40NjU4LTAuMTE3NyAyLjMyMTggMi4zNjQ2IDMuMDA2NSAzLjQ0NTIgMS4xOTI2IDIuNjc1NSA0LjAyOTUgMy42NTEzIDYuMjM3NyAzLjMxNjggMS45NTgtMC4xNzExOSAzLjg1NC0xLjQxMTUgNS40MjY4LTIuNDcwNyAwLjk5Njc5LTAuNjYxMDIgMS44Mjg0LTAuODExMjggMS45MjU2IDAuMjA3MSAwLjI5NTkyIDIuMjI3MSAwLjA4NjIgNy43MDI1IDAuMTU5NiA4LjQ4MjEgMC4xMDU1NiA4LjQ2MDkgNS4zNyAxMC41NjkgMTMuMjIzIDEwLjMzMy0wLjMxODcxIDMuNzQ2NCAwLjA1ODMgMTEuMjggNS40MzUzIDE0LjU2MiAzLjk0ODEgMi43NjA0IDYuNjY1NyAxLjI3MzIgNi43Mjk5IDcuODUzNCA3ZS0zIDYuMTkxNC0wLjQzNjkzIDEzLjA2MS0xLjI5NDYgMTguMTg5LTAuNjk1NDcgNC4wNDQ0LTEuMjQxMiA2LjQ4MzgtMi41MjUxIDEwLjM3OC0wLjY0MTk2IDEuOTE1Mi0wLjgxMzE1IDEuOTY4NyAxLjQxMjMgMS4wNjk5IDcuMTQ3Mi0zLjE0NTYgMTAuNTM5LTExLjQ4IDguMzU2Mi0xOC44NDItMC40Mzg2OS0yLjA0MzYgMC44NDUyNS0xLjcyMjYgMi44NzgxLTIuNjEwNiA5LjUyNDgtNC4yMzYzIDguMTI2NC0xMS4zMzUtMC43NTk2Ny0xNC4yNzMgMTEuOTg4LTMuMDkyNiAxMy44ODYtOC45MDAyIDYuNjg3MS0xNS4zNzUgNy4zMDc3LTUuOTE2OCAzLjYzNzgtMTYuMTc3LTIuODAzMi0xNi45OTEgMTIuNDIyLTcuMDkzNyA1LjczNDktMjIuMDYyLTUuMTAzNi0xOC40OTkgNC4xNzI4LTEyLjAzNy01LjU2MzctMjYuMjAzLTIxLjEyMS0xNi44OTQgNi45NjUzLTExLjM3MyAyLjA2NS0yMi42NjEtMTIuMTAxLTEwLjc4NS0zLjQ1NTktMTguMzgyLTE1LjE0LTE2LjU4NC0yMy45MDItNS4wMTggMC4wOTQzNS0yMC4wNzUtMTYuMDAxLTE3LjQyLTE4LjE0Ni0yLjU4OTJ6IiBzdHlsZT0iZmlsbDojZjdmN2Y3OyIvPjxwYXRoIGQ9Im01LjQzNTMgODAuNTAyYzcuNDQ2OCA5LjEzNzMgMTUuNjMyIDguODkxMiAxNS42MzIgOC44OTEycy02LjA3NzIgMy43OTgzLTYuODM2OSA5Ljg3NTVjLTAuNzU5NjYgNi4wODggNC41NTc5IDkuNjI5NSA4LjA5OTQgMTAuNjQ2IDMuNTUyMiAxLjAwNTggNy4wOTM3LTIuNzkyNSA3LjA5MzctMi43OTI1cy01LjgzMTIgMTAuNjQ2LTEuNTE5MyAxNS45NjRjNC4zMDEyIDUuMzE3NiAxMS45MDggMy4wMzg2IDExLjkwOCAzLjAzODZzLTUuMzI4MyAxMC4xMzIgMS4wMDU3IDE0LjE4N2M1LjgzMTIgMy43MjM0IDE4LjU0MiA3LjY3MTUgMjAuNTExIDguMjcwNi02LjA2NjYtOS43NDcyLTkuNTc2LTIxLjI0OS05LjU3Ni0zMy41NzV2LTAuMDQyOGMwLTM1LjIwMSAyOC41NDYtNjMuNzQ3IDYzLjc0Ny02My43NDcgMzUuMjEyIDAgNjMuNzU4IDI4LjU0NiA2My43NTggNjMuNzQ3IDAgMTIuNDc2LTMuNTg0MyAyNC4xMTYtOS43ODk5IDMzLjk0OWgwLjUzNDk2czEzLjkzMS0xLjAwNTcgMTYuMjEtOS4zNzI3YzIuMjc5LTguMzU2MiAwLjc1OTY3LTkuODc1NiAwLjc1OTY3LTkuODc1NnMxMC42MzUgMi4wMzI5IDEzLjQxNy03LjU5NjZsMi43OTI2LTkuNjI5NXMxMC4xMzIgMCAxMC44OTItNy4wODNjMC43NTk2My03LjA5MzctNy4wMjk1LTEyLjQxMS03LjAyOTUtMTIuNDExczExLjQ1OSAwLjgyMzg1IDE0LjQ5OC0xMC40NTNjMS4wMTY0LTMuNzU1NSAwLjgzNDU2LTguMjE3MSAwLjEzOTEtMTIuNDk3LTE3LjY2NS00MS4xNjEtNTguNTY5LTY5Ljk5NS0xMDYuMTgtNjkuOTk1LTMwLjYzMiAwLTYwLjAzNCAxMi4xODctODEuNjc5IDMzLjgzMXYwLjAxMDdjLTEzLjE3MSAxMy4xNzEtMjIuODMzIDI5LjIyLTI4LjM4NiA0Ni42NnoiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+PHBhdGggZD0ibTEzMyAxMDguMTdoMTQuMTdtLTYzLjI2IDBoMTQuMDltLTIwLjY5LTguOTNhMjEuMzEgMjEuMzEgMCAwIDEgMjcuMjkgMG0yMS44IDBhMjEuMzEgMjEuMzEgMCAwIDEgMjcuMjkgMCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQuODI0M3B4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xMjIuODMgMTUxLjg4YTEwLjQ5IDEwLjQ4OSAwIDAgMS0xNC42NiAwIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6Ni4xOTk2cHg7c3Ryb2tlOiMwMDA7Ii8+PC9zdmc+',
            desc: '世界的本质，生灵的恐惧',
            password: 'xhadmin',
            token: 'P1DeqWBao0HTU47Q',
            organization: '某大型公司CTO',
            location: '中国',
            email: 'kang.jie@advantech.com.cn',
            auths: [],
            is_admin: 1,
            dev_languages: 'JavaScript/Vue/React/Node/Java',
            role: 'admin'

        }, {
            user_id: '80',
            user_name: 'test',
            real_name: '羲和元初',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiM4ODRmMDA7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZmFlM2I5OyIvPjxwYXRoIGQ9Im0xNDEuNzUgMTk0Ljk4YTExNC43OSAxMTQuNzggMCAwIDEgMzggMTYuNDk4IDExNS41MyAxMTUuNTIgMCAwIDEtMTI4LjQ2IDAgMTE0Ljc5IDExNC43OCAwIDAgMSAzOC0xNi40OThsMTUuNzEgMTUuNzQ4aDIxeiIgc3R5bGU9ImZpbGw6I2ZmMDAwMDsiLz48cGF0aCBkPSJtNzAgMjAwLjg4djIwLjc3Yy0yLjIyLTAuOTUzMjUtNC4zOTk5LTEuOTY5OC02LjUzOTktMy4wNDk2aC0wLjEwMDg4di0xNC42MjFjMi4xNy0xLjEgNC4zOS0yLjEzOTkgNi42NC0zLjA5OTZ6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Im0xNjEgMjAwLjg4djIwLjc3YzEuOS0wLjgwOTg2IDMuNzcwMi0xLjY3OTggNS42MjAxLTIuNTg5OGwwLjA5ODktMC4wNDk0IDAuODIwMDUtMC40MDk5N2gwLjEwMDg4di0xNC42MjFjLTIuMTctMS4xLTQuMzktMi4xMzk5LTYuNjQwMi0zLjA5OTZ6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwb2x5Z29uIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC45OTk4NyA0ZS01IC0zZS01KSIgcG9pbnRzPSI5Ny4zMiAyMDEuOTMgMTE1LjUgMjIzLjcyIDEzMy42OCAyMDEuOTMiIHN0eWxlPSJmaWxsOiMxNDE3MjA7Ii8+PHBhdGggZD0ibTExMS4yIDIzMC44OCAxLjMxLTE2LjkwOGMwLjMyOTkyIDEuMjc5OCA1LjYzOTkgMS4yNzk4IDUuOTk5OSAwbDEuMzIwMSAxNi45MzhjLTEuNDMwMSAwLjA0OTQtMi44NjAxIDAuMDg5LTQuMyAwLjA4OXMtMi44NyAwLTQuMy0wLjA4OXoiIHN0eWxlPSJmaWxsOiMxNDE3MjA7Ii8+PHBhdGggZD0ibTExNS40OSAyMDEuNzl2MC4wNjkybC03LjU1IDEyLjY3OC03LjAwMDEgMTEuODA5LTE5LjE5LTI2LjQ4N2MwLjYwOTk5LTAuNDI5OTUgMS4yMi0wLjg5OTg1IDEuODAwMS0xLjM4OTlhNTIgNTEuOTkzIDAgMCAwIDEwLjA3LTEwLjYxOWwyMS43OSAxMy44Nzh6IiBzdHlsZT0iZmlsbDojZTdlY2YyOyIvPjxwYXRoIGQ9Im0xNDkuMjQgMTk5Ljg2LTE5LjA4IDI2LjUxNy03LjAwMDEtMTEuODA5LTcuNTctMTIuNjc4LTAuMDU5My0wLjEwMDg2IDIxLjk0LTEzLjk5OGE1Mi4yMSA1Mi4yMDMgMCAwIDAgMTAuMDggMTAuNjk5YzAuNTgwMTMgMC40NzAwOSAxLjE1MDIgMC45MjAwMiAxLjczMDEgMS4zMzk5eiIgc3R5bGU9ImZpbGw6I2U3ZWNmMjsiLz48cGF0aCBkPSJtMTE1LjUgNTEuNzVjLTM4LjcwMiA1LjMxMDEtNTQuMjE1IDE4LjAzOC01OS44NjMgMzUuMTAxIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlOiMzMjM5M2Y7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1Yy03LjgzOTMgMy42MzM3LTUuNTk3NCAxNi41ODMtMTQuMzQxIDIzLjQ1MiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0xMTEuMzUgNDguNjE0Yy0yMi42MzQtNi45MTgxLTQyLjQ1Ny0zLjE5ODgtNTUuNzMzIDIuNTEwNSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0xMTUuNDcgNTQuMDA4YzAuMTk2NS02Ljc3NzQtMC4xNDM2LTI2LjMwOSAwLjA1LTM4LjE4NCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im02OC44NzQgMjguMTc3YzM0LjExNS0zLjM4MiA0MS45ODcgMTMuMzIxIDQ1LjE3IDE5LjYwMiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0xMTYuNDkgNDguNjljMi44ODc2LTYuMzAxOSAxMC4zNTgtMjEuNTE4IDQzLjQ2OS0yMi4zMjYiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDoxMjtzdHJva2U6IzMyMzkzZjsiLz48cGF0aCBkPSJtMTE2LjkyIDUxLjc2NmMxLjUwOTQgNi4zOTkxIDMuNDk4OCAxNS41OTUgMTAuMDg4IDIzLjA1OCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0xMTMuODEgNTEuNTMyYzIyLjAzLTcuODY3NCA0Ni43MDktNy4zNjE0IDU5LjQ0NC0yLjA0NjUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDoxMjtzdHJva2U6IzMyMzkzZjsiLz48cGF0aCBkPSJtMTE0LjUzIDUyLjI3OGMzNi4yMjYgNC44NTgzIDUyLjQxNCAxNy4wOTIgNTkuMzczIDMzLjM0NyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im01NS42MzcgODYuODUxYy00LjEyMTMgMTIuNDUyLTIuOTg3NyAyNy4yMTMtMS43NzcgNDMuMDg0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlOiMzMjM5M2Y7Ii8+PHBhdGggZD0ibTU1LjYxNCA1MS4xMjRjLTEzLjQyMiA1LjUwMTktMjEuOTA4IDE2LjQwOS0yNC43MTIgMjguNzc0LTEuODMyMiA4LjQ2MzItMS45ODA5IDE4LjE1Ni0xLjYwOTYgMjguNDg2IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlOiMzMjM5M2Y7Ii8+PHBhdGggZD0ibTE3My4yNiA0OS40ODZjMjQuOTE3IDEwLjM5OSAyNi43MDcgMzYuNTM3IDI3LjIwOSA1OS42MiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0xNzMuOSA4NS42MjVjNS40MDQyIDEyLjYyNSA1LjI0MTMgMjcuNjc1IDQuNTc0NSA0My41OCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im01My44NiAxMjkuOTNjMS4yOTMgMTYuOTUxIDIuNjczOCAzNS4xNjktMi4xNjY0IDUzLjE5MyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0yOS4yOTIgMTA4LjM4YzAuNjE3MyAxNy4xNzcgMi42NzIyIDM2LjExOSAwLjgxNTggNTQuMTA4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlOiMzMjM5M2Y7Ii8+PHBhdGggZD0ibTIwMC40NyAxMDkuMTFjMC4zNTg2IDE4LjUyOS0xLjI3NTEgMzYuOTQgMS45MjMxIDQ4Ljk4NSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEyO3N0cm9rZTojMzIzOTNmOyIvPjxwYXRoIGQ9Im0xNzguNDggMTI5LjJjLTAuNzI3OSAxNy4zNjItMi4wNTYzIDM1Ljc0MyAyLjYwMTEgNTMuMDk5IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MTI7c3Ryb2tlOiMzMjM5M2Y7Ii8+PHBhdGggZD0ibTEzMyAxMDguMTdoMTQuMTdtLTYzLjI2IDBoMTQuMDltLTIwLjY5LTguOTNhMjEuMzEgMjEuMzEgMCAwIDEgMjcuMjkgMG0yMS44IDBhMjEuMzEgMjEuMzEgMCAwIDEgMjcuMjkgMCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQuODI0M3B4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xMTUuNjggMTYwLjY0YzcuMDggMCAxMy4xMS00LjkzIDE1LjQ2LTExLjg0YTIuMTQgMi4xNCAwIDAgMC0xLjUxLTIuNjEwMSAyLjMgMi4zIDAgMCAwLTAuNzM5OTUtMC4wNTkzaC0yNi40MmEyLjEyIDIuMTIgMCAwIDAtMi4zMSAxLjkwOTkgMS44NSAxLjg1IDAgMCAwIDAuMDU5MyAwLjczOTk1YzIuMzQwMSA2LjkzMDEgOC4zODAyIDExLjg2IDE1LjQ2IDExLjg2eiIgc3R5bGU9ImZpbGw6IzdkMDAwMDsiLz48L3N2Zz4=',
            desc: '云想衣裳花想容，春风拂槛露华浓',
            password: 'test',
            token: 'yg8bE8nZwiCL4nQg',
            organization: '某大型公司CTO',
            location: '中国',
            email: '8888@china.com',
            auths: [],
            is_admin: 0,
            dev_languages: 'JavaScript/Vue/React/Node/PHP',
            role: 'user',
        }
    ]
}
export default [
    {
        url: '/user/profile',
        timeout: 200,
        method: 'get',
        response: (request: requestParams) => {
            const token = getRequestToken(request);
            if (!token) return errorResult('Invalid token')
            const checkUser = createFakeUserList().find((item) => `${TokenPrefix}${item.token}` === token);
            if (!checkUser) {
                return errorResult('未获得相应的用户信息');
            }
            return successResult(checkUser);
        }
    },
    {
        url: '/user/login',
        timeout: 200,
        method: 'post',
        response: (request: requestParams) => {
            const { username, password } = request?.body;
            const checkUser = createFakeUserList().find(
                (item) => item.user_name === username && item.password === password
            )
            if (!checkUser) {
                return errorResult('不存在该用户');
            }
            return successResult({ token: checkUser.token })
        }
    },
    {
        url: '/user/logout',
        timeout: 200,
        method: 'post',
        response: (request: requestParams) => {
            console.dir(request)
            const token = getRequestToken(request);
            if (!token) return errorResult('token缺失!');
            const checkUser = createFakeUserList().find((item) => `${TokenPrefix}${item.token}` === token);
            if (!checkUser) {
                return errorResult('token缺失!');
            }
            return successResult('Token 已失效');
        },
    },
    {
        url: '/text',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
] as MockMethod[]
