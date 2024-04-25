
export const Roles = [
    { name: 'Content Creator', value: 'CONTENT_CREATOR' },
    { name: 'Content Reviewer', value: 'CONTENT_REVIEWER' },
    { name: 'Book Creator', value: 'BOOK_CREATOR' },
    { name: 'Book Reviewer', value: 'BOOK_REVIEWER' },
    { name: 'Org Admin', value: 'ORG_ADMIN' },
    { name: 'Public', value: 'PUBLIC' }
]

export const SystemRoles = [
    { name: 'CONTENT_CREATOR', role: 'Content Creator', count: 0 },
    { name: 'CONTENT_REVIEWER', role: 'Content Reviewer', count: 0 },
    { name: 'BOOK_CREATOR', role: 'Book Creator', count: 0 },
    { name: 'Book Reviewer', role: 'Book Reviewer', count: 0 },
    { name: 'ORG_ADMIN', role: 'Org Admin', count: 0 },
    { name: 'PUBLIC', role: 'Public', count: 0 }
]

export const SessionStorageKeys = {
    ACCESS_TOKEN: 'access_token',
    AUTH_TOKEN: 'auth_token',
    TARGET_URL: 'target_url',
  };

export const CategoryName = [
    { name: 'Board', value: 'BOARD' },
    { name: 'Medium', value: 'MEDIUM' },
    { name: 'Grade', value: 'GRADE' },
    { name: 'Subject', value: 'SUBJECT' },
];

export const CategoryCode = [
    { value: 'board', name: 'Board' },
    { value: 'medium', name: 'Medium' },
    { value: 'gradeLevel', name: 'Grade' },
    { value: 'subject', name: 'Subject' },
];

export const BatchType =[
    { value: 'open', name: 'Open' },
    { value: 'invite-only', name: 'Invite-only' },
]