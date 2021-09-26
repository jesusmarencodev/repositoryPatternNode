//aqui gestionaremos todas nuestras dependencias.
import express = require('express');
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './services/repositories/implementation/mysql/suscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMYSQLRepository } from './services/repositories/implementation/mysql/movement.repository';
import { BalanceMYSQLRepository } from './services/repositories/implementation/mysql/balance.repository';
import { MovementService } from './services/movement.service';
import { BalanceService } from './services/balance.service';
import { SubscriptionMSSQLRepository } from './services/repositories/implementation/mssql/suscription.repository';
import { MovementMSSQLRepository } from './services/repositories/implementation/mssql/movement.repository';
import { BalanceMSSQLRepository } from './services/repositories/implementation/mssql/balance.repository';
import { SubscriptionMockRepository } from './services/repositories/implementation/mock/suscription.repository';
import { MovementMockRepository } from './services/repositories/implementation/mock/movement.repository';
import { BalanceMockRepository } from './services/repositories/implementation/mock/balance.repository';




 //cuando exporto de esta forma y no coloco nombre,  al importar puedo colocarle el nombre que quiera
export default (app:express.Application) => {
    const container = createContainer({
        injectionMode : 'CLASSIC'
    });

    container.register({
        //repositories
/*         subscriptionRepository : asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository : asClass(MovementMYSQLRepository),
        balanceRepository : asClass(BalanceMYSQLRepository), */

        //subscriptionRepository : asClass(SubscriptionMSSQLRepository).scoped(),
        //movementRepository : asClass(MovementMSSQLRepository),
        //balanceRepository : asClass(BalanceMSSQLRepository),

        subscriptionRepository : asClass(SubscriptionMockRepository).scoped(),
        movementRepository : asClass(MovementMockRepository),
        balanceRepository : asClass(BalanceMockRepository),
        

        //services
        subscriptionService : asClass(SubscriptionService).scoped(),
        movementService     : asClass(MovementService),
        balanceService      : asClass(BalanceService),
        testService : asClass(TestService).scoped(),

    });

    app.use(scopePerRequest(container)); // asociar el contenedor a express
};