import { rest } from 'msw'
import { baseURL } from '@/api/API'

export const handlers = [
  rest.get(`${baseURL}auth/me`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 9,
        email: 'tes@test.com',
        login: 'test',
      }),
    )
  }),

  rest.get(`${baseURL}users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: [
          {
            name: 'yewhen22888',
            id: 28747,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null,
            },
            status: null,
            followed: false,
          },
          {
            name: 'Jamaica',
            id: 28746,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null,
            },
            status: null,
            followed: false,
          },
          {
            name: 'Martyn',
            id: 28745,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null,
            },
            status: null,
            followed: false,
          },
          {
            name: 'artemdvd',
            id: 28744,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null,
            },
            status: null,
            followed: false,
          },
          {
            name: 'VikTorNadoUse',
            id: 28743,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null,
            },
            status: null,
            followed: false,
          },
          {
            name: 'vikTorNado',
            id: 28742,
            uniqueUrlName: null,
            photos: {
              small: null,
              large: null,
            },
            status: null,
            followed: false,
          },
        ],
        totalCount: 23755,
        error: null,
      }),
    )
  }),
]
