import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { projectServiceURL } from '../../config';
import { Project } from './interfaces/project.interface';

@Injectable()
export class FetchProjectService {
  private httpService: AxiosInstance;

  constructor() {
    this.httpService = axios.create({
      baseURL: projectServiceURL,
    });
  }

  async findProjectById(id: string): Promise<Project> {
    const { data } = await this.httpService.get(`/projects/${id}`);

    return data;
  }
}
