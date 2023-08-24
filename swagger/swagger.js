const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'REST API',
            description: 'API Documentation',
            version: '1.0.0',
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                in: 'header',
                name: 'Authorization',
                description: 'Bearer Token',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security:[
        {
        bearerAuth: [],
    },
        ],
    apis: ['./routes/*.js']
    }

const swaggerSpec = swaggerJSDoc(options)

swaggerSpec.paths = {
    '/api/auth/register': {
        post: {
            summary: 'Регистрация пользователя',
            tags:["Authentication"],
            description: 'Регистрация нового пользователя с использованием имени, фамилии, электронной почты и пароля.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                fname: {
                                    type: 'string',
                                },
                                lname: {
                                    type: 'string',
                                },
                                email: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Пользователь успешно создан',
                },
                400: {
                    description: 'Ошибка валидации или пользователь уже существует',
                },
                500: {
                    description: 'Внутренняя ошибка сервера',
                },
            },
        },
    },
    '/api/auth/login': {
        post: {
            summary: 'Авторизация пользователя',
            tags:["Authentication"],
            description: 'Авторизация пользователя с использованием электронной почты и пароля.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Успешная авторизация. В заголовке ответа будет передан токен авторизации.',
                },
                400: {
                    description: 'Некорректный email или пароль.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/users': {
        get: {
            summary: 'Получить список всех пользователей',
            tags:["User"],
            description: 'Получить список всех пользователей. Требуется аутентификация.',
            security: [{ bearerAuth: [], ApiKeyAuth: [] }],
            responses: {
                200: {
                    description: 'Список пользователей успешно получен.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        post: {
            summary: 'Создать нового пользователя',
            tags:["User"],
            description: 'Создать нового пользователя. Требуется аутентификация.',
            security: [{ bearerAuth: [], ApiKeyAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                fname: {
                                    type: 'string',
                                },
                                lname: {
                                    type: 'string',
                                },
                                email: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Пользователь успешно создан.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
    '/api/users/{id}': {
        get: {
            summary: 'Получить информацию о пользователе по ID',
            tags:["User"],
            description: 'Получить информацию о пользователе по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: [], ApiKeyAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID пользователя',
                },
            ],
            responses: {
                200: {
                    description: 'Информация о пользователе успешно получена.',
                },
                404: {
                    description: 'Пользователь не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        put: {
            summary: 'Обновить информацию о пользователе по ID',
            tags:["User"],
            description: 'Обновить информацию о пользователе по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: [], ApiKeyAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID пользователя',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                fname: {
                                    type: 'string',
                                },
                                lname: {
                                    type: 'string',
                                },
                                email: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Информация о пользователе успешно обновлена.',
                },
                404: {
                    description: 'Пользователь не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
        delete: {
            summary: 'Удалить пользователя по ID',
            tags:["User"],
            description: 'Удалить пользователя по указанному ID. Требуется аутентификация.',
            security: [{ bearerAuth: [], ApiKeyAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID пользователя',
                },
            ],
            responses: {
                200: {
                    description: 'Пользователь успешно удален.',
                },
                404: {
                    description: 'Пользователь не найден.',
                },
                500: {
                    description: 'Внутренняя ошибка сервера.',
                },
            },
        },
    },
}

module.exports = swaggerSpec