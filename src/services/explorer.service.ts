import { Injectable, Type } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { SAGA_STEP_HANDLER_METADATA } from '../decorators/constants';
import { SagaStepHandler } from '../interfaces/saga-step-handler.interface';

@Injectable()
export class ExplorerService {
  constructor(private readonly modulesContainer: ModulesContainer) { }

  explore() {
    const modules = [...this.modulesContainer.values()];
    const steps = this.flatMap<SagaStepHandler>(modules, (instance) => (
      this.filterProvider(instance, SAGA_STEP_HANDLER_METADATA)
    ));

    return { steps };
  }

  flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Type<any> | undefined,
  ): Type<T>[] {
    const items = modules
      .map((module) => [...module.providers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);

    return items.filter((element): element is Type<T> => !!element);
  }

  filterProvider(wrapper: InstanceWrapper, metadataKey: string): Type<any> | undefined {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }

    return this.extractMetadata(instance, metadataKey);
  }

  extractMetadata(instance: Record<string, any>, metadataKey: string) {
    if (!instance.constructor) {
      return;
    }
    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);

    return metadata ? (instance.constructor as Type<any>) : undefined;
  }
}
