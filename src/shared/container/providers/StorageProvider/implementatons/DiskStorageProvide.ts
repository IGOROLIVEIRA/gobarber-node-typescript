import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    // pega o caminho do arquivo
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    try {
      // olha se o arquivo existe
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    // remove o arquivo
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
