import { Injectable } from '@nestjs/common';
import { CommunicationRepositoryInterface } from '@/communication/domains/repositories/communication.repository';
import { ICreateCommunication } from '@/shared/interfaces/createCommunication.interface';
import { PrismaService } from '@/infra/config/prisma/prisma.service';
import { CommunicationEntity } from '@/communication/domains/entities/communication.entity';

@Injectable()
export class CommunicationRepository
  implements CommunicationRepositoryInterface
{
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    createCommunicationDto,
    type,
  }: {
    createCommunicationDto: ICreateCommunication;
    type: string;
  }): Promise<CommunicationEntity> {
    return this.prismaService.communication.create({
      data: {
        to: createCommunicationDto.to,
        body: createCommunicationDto.body,
        subject: createCommunicationDto.subject,
        type: type,
      },
    });
  }

  async get({ id }: { id: string }): Promise<CommunicationEntity> {
    return this.prismaService.communication.findUnique({
      where: { id },
      include: {
        detail: true,
      },
    });
  }

  async updateSuccessCase({
    id,
    provider,
    status,
    sendedAt,
  }: {
    id: string;
    provider: string;
    status: string;
    sendedAt: Date;
  }): Promise<CommunicationEntity> {
    return this.prismaService.communication.update({
      where: { id },
      data: {
        provider,
        status,
        sendedAt,
      },
    });
  }

  async updateErrorCase({
    id,
    status,
    sendedAt,
    description,
  }: {
    id: string;
    status: string;
    sendedAt: Date;
    description: string;
  }): Promise<CommunicationEntity> {
    return this.prismaService.communication.update({
      where: { id },
      data: {
        status,
        sendedAt,
        detail: {
          create: {
            message: description,
          },
        },
      },
    });
  }
}
