import { SagaStep } from './saga-step.interface';

export interface SagaOrchestrator<TStep extends SagaStep = any, TResult = any> {
  execute(step: TStep): Promise<TResult>;
  reject?(step: TStep): Promise<void>;
}
