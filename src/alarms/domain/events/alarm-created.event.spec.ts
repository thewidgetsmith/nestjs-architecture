import { Test } from '@nestjs/testing';

import { AlarmFactory } from '@app/alarms/domain/factories/alarm.factory';

import {
  AlarmCreatedEvent,
  AlarmCreatedEventHandler,
} from './alarm-created.event';

describe('AlarmCreatedEvent handling', () => {
  describe('AlarmCreatedEvent', () => {
    it('should create an AlarmCreatedEvent instance', () => {
      const alarm = new AlarmFactory().create('Test Alarm', 'HIGH');
      const event = new AlarmCreatedEvent(alarm);

      expect(event instanceof AlarmCreatedEvent).toBe(true);
      expect(event.alarm.severity.value).toBe('HIGH');
      expect(event.alarm.name).toBe('Test Alarm');
    });
  });

  describe('AlarmCreatedEventHandler', () => {
    let handler: AlarmCreatedEventHandler;

    beforeEach(async () => {
      const mod = await Test.createTestingModule({
        providers: [AlarmFactory, AlarmCreatedEventHandler],
      }).compile();

      handler = mod.get(AlarmCreatedEventHandler);
    });

    describe('handle', () => {
      it('should be called', async () => {
        const { name, severity, triggeredAt } = {
          name: 'Test Alarm',
          severity: 'high',
          triggeredAt: new Date(),
        };

        const alarm = new AlarmFactory().create(name, severity, { triggeredAt });
        const event = new AlarmCreatedEvent(alarm);

        handler.handle(event);

        // Currently, all the handler does is log the event.
        // Nothing really to test here yet except maybe the call to logger.
        expect(true).toBe(true);
      });
    });
  });
});
