const config = { pageSize: process.env.PAGE_SIZE,
                 dateSize: process.env.DATE_SIZE,
               };

const tags = [{ name: 'em progresso',
                color: '#EDE04D',
               },
               { name: 'pendente',
                 color: '#ED4F32',
               },
               { name: 'finalizado',
                 color: '#15CD72',
               }
             ];

module.exports = { config, tags };
