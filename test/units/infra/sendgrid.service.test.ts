import { SendgridService } from '@/infra/sendgrid/sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { LoggerService } from '@/infra/logger/logger.service';

jest.mock('@/infra/logger/logger.service');

describe('SendgridService', () => {
  it('should call mailService.send', async () => {
    const mailService = new MailService();
    jest.spyOn(mailService, 'send').mockResolvedValueOnce([{}, {}] as any);

    const loggerServiceMock = new LoggerService() as jest.Mocked<LoggerService>;

    const sendgridService = new SendgridService(loggerServiceMock, mailService);

    await sendgridService.send({
      to: 'patrick.navega@telefonica.com',
      body: '<h1>PSN teste<h1>',
      from: 'psnavega97@gmail.com',
      subject: 'Test Email',
    });

    expect(mailService.send).toHaveBeenCalled();
  });
});
