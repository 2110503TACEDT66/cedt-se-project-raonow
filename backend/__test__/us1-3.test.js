const { createMember } = require('../controllers/member');;
const Member = require('../models/Member');
const User = require('../models/User');

// Mock the dependencies
jest.mock('../models/Member');
jest.mock('../models/User');

// Define mock implementations for Member.create and User.findByIdAndUpdate
Member.create.mockResolvedValue({ _id: 'member_id' });
User.findByIdAndUpdate.mockResolvedValue(null); // Assuming no error in the update operation

const res = {
    status: jest.fn(() => res),
    json: jest.fn()
};

const next = jest.fn();

const isRequestBodyValid = (body) => {
  const requiredProperties = ['address', 'province', 'logs', 'point', 'user'];
  const hasAllProperties = requiredProperties.every(prop => prop in body);

  const isValidBirthdayFormat = /^\d{4}-\d{2}-\d{2}$/.test(body.birthday);

  const [yearStr, monthStr, dayStr] = body.birthday.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if(month < 1 || month > 12 || day < 0) return false;
  else if((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) return false;
  else if(month == 2) {
    if(year%4==0 && day > 29) return false;
    else if(year%4!=0 &&day > 28) return false;
  }
  else if(day > 31) return false;
  
  return hasAllProperties && isValidBirthdayFormat;
};

// Test case
describe('Invalid inputs', () => {
  it('TC7', async () => {
    const req = {
        body: {
            "province": "BKK",
            "birthday": "2004-04-04"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });

  it('TC8', async () => {
    const req = {
        body: {
            "province": "BKK",
            "birthday": "2004-04-31"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });

  it('TC9', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "birthday": "204-00-00"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });

  it('TC11', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2024-02-30"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });
  
  it('TC12', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2024-222-222"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });

  it('TC14', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2024-01-33"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });

  it('TC16', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2023-02-29"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(false);
  });
});

describe('Valid inputs', () => {
  it('TC10', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2024-02-29"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(true);
  });

  it('TC13', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2024-01-20"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(true);
  });

  it('TC15', async () => {
    const req = {
        body: {
            "address": "Pathum Wan",
            "province": "BKK",
            "birthday": "2023-02-20"  
        },
        user: {
            id: "66314a5262b98b3503e4d29b",
            role: "user",
        }
    };
    await createMember(req, res, next);
    expect(isRequestBodyValid(req.body)).toBe(true);
  });
});