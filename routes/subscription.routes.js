import { Router } from 'express'
import authorize from '../middleware/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => res.send({ title : "GET all subscription"}))

subscriptionRouter.get('/:id', (req,res) => res.send({ title : "GET subscription"}))

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req,res) => res.send({ title : "UPDATE subscription"}))

subscriptionRouter.delete('/:id', (req,res) => res.send({ title : "DELETE subscription"}))

//upto this we have done our CURD operations, with get we've read,
//with post we've create, with put we've update, with delete we've deleled the subscription

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req,res) => res.send({ title : "CANCEL subscription"}))

subscriptionRouter.get('/upcoming-renewals', (req,res) => res.send({ title : "GET upcoming renewals"}))

export default subscriptionRouter;