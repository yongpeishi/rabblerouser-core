import branchService from '../branchService';

describe('branchService', () => {
  let server;
  const invalidData = { data: 'invalid' };

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });

  afterEach(() => {
    server.restore();
  });

  describe('getBranchGroups', () => {
    const validGroupsPayload =
      [
        {
          id: 'd35048f7-3f06-45e2-8a37-dfb29bbfa81b',
          name: 'Tuesday',
          description: 'Hi',
        },
        {
          id: 'd35048f7-45e2-8a37-dfb29bbfa81b',
          name: 'Wednesday',
          description: 'Hi',
        },
      ];

    describe('when the groups are retrieved in a valid format', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/groups',
          [200, { 'Content-Type': 'application/json' },
            JSON.stringify({ groups: validGroupsPayload })]);
      });

      it('should return a list of the branches', done => {
        branchService.getBranchGroups('112-11-21-2')
          .then(groups => {
            expect(groups).toEqual(validGroupsPayload);
          })
          .then(done, done.fail);
      });
    });

    describe('when the branch id is undefined', () => {
      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranchGroups()
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the groups are retrieved in an invalid format', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/groups',
          [200, { 'Content-Type': 'application/json' },
            JSON.stringify({ invalid: invalidData })]);
      });

      it('should return an error that return data was invalid', done => {
        branchService.getBranchGroups('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT AVAILABLE');
            done();
          });
      });
    });

    describe('when the remote groups are 401 unauthorised', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/groups', [401, {}, '']);
      });

      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranchGroups('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the remote groups are 404 not found', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/groups', [404, {}, '']);
      });

      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranchGroups('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the remote returns a 500 server error', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/groups', [500, {}, '']);
      });

      it('should return a general server error', done => {
        branchService.getBranchGroups('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT AVAILABLE');
            done();
          });
      });
    });
  });

  describe('getBranchMembers', () => {
    const validMembersPayload = [{
      id: 'd35048f7-3f06-45e2-8a37-dfb29bbfa81b',
      firstName: 'Jo jo',
      lastName: 'The 3rd',
      primaryPhoneNumber: '101010010',
      email: 'jo@jo.com',
      postalAddress: {
        id: 1,
        address: '303 Collins St',
        suburb: 'Melbourne',
        state: 'Victoria',
        postcode: '3000',
        country: 'Australia' },
      memberSince: '2016-03-08T22:34:23.721Z',
      notes: 'Some notes',
      additionalInfo: 'Some additional info',
      groups: [{ id: 1, name: 'Group name' }],
      branchId: '1234',
    }];

    describe('when the members are retrieved in a valid format', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/members',
          [200, { 'Content-Type': 'application/json' },
            JSON.stringify({ members: validMembersPayload })]);
      });

      it('should return a list of the members for the branch', done => {
        branchService.getBranchMembers('112-11-21-2')
          .then(members => {
            expect(members).toEqual(validMembersPayload);
          })
          .then(done, done.fail);
      });
    });

    describe('when the branch id is undefined', () => {
      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranchMembers()
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the remote members are 404 not found', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/members', [404, {}, '']);
      });

      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranchMembers('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the remote members are 401 unauthorised', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/members', [401, {}, '']);
      });

      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranchMembers('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the remote returns a 500 server error', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches/112-11-21-2/members', [500, {}, '']);
      });

      it('should return a general server error', done => {
        branchService.getBranchMembers('112-11-21-2')
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT AVAILABLE');
            done();
          });
      });
    });
  });

  describe('getBranches', () => {
    const validBranchesPayload =
      [
        {
          id: 'd35048f7-3f06-45e2-8a37-dfb29bbfa81b',
          name: 'Branch 1',
          notes: 'note',
          contact: 'somebody',
        },
        {
          id: 'd35048f7-45e2-8a37-dfb29bbfa81b',
          name: 'Branch 2',
          notes: 'note',
          contact: 'somebody',
        },
      ];

    describe('when the branches are retrieved in a valid format', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches',
          [200, { 'Content-Type': 'application/json' },
            JSON.stringify({ branches: validBranchesPayload })]);
      });

      it('should return a list of the branches', done => {
        branchService.getBranches()
          .then(branches => {
            expect(branches).toEqual(validBranchesPayload);
          })
          .then(done, done.fail);
      });
    });

    describe('when the branches are retrieved in an invalid format', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches',
          [200, { 'Content-Type': 'application/json' },
            JSON.stringify({ invalid: invalidData })]);
      });

      it('should return an error that return data was invalid', done => {
        branchService.getBranches()
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT AVAILABLE');
            done();
          });
      });
    });

    describe('when the remote branches are 404 not found', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches', [404, {}, '']);
      });

      it('should return an error that the remote endpoint was not found', done => {
        branchService.getBranches()
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT FOUND');
            done();
          });
      });
    });

    describe('when the remote returns a 500 server error', () => {
      beforeEach(() => {
        server.respondWith('GET', '/branches', [500, {}, '']);
      });

      it('should return a general server error', done => {
        branchService.getBranches()
          .then(() => {
            done.fail('Expected promise to be rejected');
          })
          .fail(error => {
            expect(error.message).toEqual('NOT AVAILABLE');
            done();
          });
      });
    });
  });
});
