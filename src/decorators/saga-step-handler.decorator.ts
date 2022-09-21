import 'reflect-metadata';
import { v4 } from 'uuid';
import { SagaStep } from '../interfaces/saga-step.interface';
import { SAGA_STEP_HANDLER_METADATA, SAGA_STEP_METADATA } from './constants';

export const SagaStepHandler = (step: SagaStep): ClassDecorator => (target: object) => {
  if (!Reflect.hasMetadata(SAGA_STEP_METADATA, step)) {
    Reflect.defineMetadata(SAGA_STEP_METADATA, { id: v4() }, step);
  }
  Reflect.defineMetadata(SAGA_STEP_HANDLER_METADATA, step, target);
};
