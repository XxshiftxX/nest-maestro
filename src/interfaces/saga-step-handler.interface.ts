import { ISagaStep } from './saga-step.interface';

export interface ISagaStepHandler<TStep extends ISagaStep = any, TResult = any> {
  execute(step: TStep): Promise<TResult>;
  reject?(step: TStep): Promise<void>;
}
