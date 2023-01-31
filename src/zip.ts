import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
export function zip() {
  // 获取到目录下所有的文件 以及 文件夹夹名称
  const readDir = fs.readdirSync('./');
  const filterFiles = [
    '.git',
    '.DS_Store',
    '.vscode',
    'zip',
    'node_modules',
    'ec-zlb-h5',
    'build',
    'dist',
    'zlb-h5.zip',
    'zlb-h5',
  ];
  // 先看是不是已经存在 如果存在 就删除
  if (readDir.includes('zlb-h5.zip')) {
    fs.unlinkSync('./zlb-h5.zip');
  }
  const needFiles = readDir.filter(item => !filterFiles.includes(item));
  // 创建文件输出流
  const output = fs.createWriteStream(path.resolve(__dirname, '..') + '/zlb-h5.zip');
  const archive = archiver('zip', {
    // zlib: { level: 9 }, // 设置压缩级别
  });
  // 文件输出流结束
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });
  // 数据源是否耗尽
  output.on('end', function () {
    console.log('Data has been drained');
  });
  // 存档警告
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });
  archive.on('progress', ({ entries, fs }) => {
    const { processed, total } = entries;
    const { totalBytes, processedBytes } = fs;
    console.log(`需要压缩总数:${total},当前压榨第${processed}个`);
    console.log(`添加的字节数:${totalBytes},当前添加的字节数:${processedBytes}`);
  });
  // 存档出错
  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  for (let i = 0; i < needFiles.length; i++) {
    const item = needFiles[i];
    if (isFile(item)) {
      // 判断 item 类型,
      const file = path.resolve(__dirname, '..') + `/${item}`;
      archive.append(fs.createReadStream(file), { name: item });
    } else {
      archive.directory(`${item}/`);
    }
  }
  // 判断文件类型
  function isFile(fileName) {
    // 特殊文件数组
    const special = ['.env', '.gitignore'];
    if (special.includes(fileName)) {
      return true;
    } else if (fileName.indexOf('.') === -1 || fileName.lastIndexOf('.') === 0) {
      return false;
    } else if (fileName.lastIndexOf('.') > 0) {
      return true;
    }
  }
  archive.finalize();
}
