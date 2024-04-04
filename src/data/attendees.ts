import { faker } from '@faker-js/faker'

//Cria uma array de tamanho 200 e percorre ela inteira
export const attendees = Array.from({ length: 203 }).map(() => {
    //Retorna as infos dos participantes
    return {
        //id recebe um numero inteiro de no minimo 10.000 e no maximo 20.000
        id: faker.number.int({ min: 10000, max: 20000 }),
        //name recebe um nome fake completo aleatorio
        name: faker.person.fullName(),
        //email recebe um email fake aleatorio
        email: faker.internet.email().toLocaleLowerCase(),
        
        //Cria uma data aletoria ate 30 dias atras do dia atual
        createdAt: faker.date.recent({ days: 30 }),

        //Cria uma data aleatoria até 7 dias atras do dia atual
        checkedInAt: faker.date.recent({ days: 7 })
    }
})