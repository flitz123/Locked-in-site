import drive from './googleAuth.js';

export async function createTempAccess(fileId) {
  const permission = await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  });

  const file = await drive.files.get({
    fileId,
    fields: 'webContentLink'
  });

  return {
    link: file.data.webContentLink,
    permissionId: permission.data.id
  };
}

export async function revokeAccess(fileId, permissionId) {
  await drive.permissions.delete({
    fileId,
    permissionId
  });
}
