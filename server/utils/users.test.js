const expect = require('expect');
const {Users} = require('./users.js')

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Parish',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Khan',
      room: 'React Course'
    },{
      id: '3',
      name: 'Mezbibur',
      room: 'Node Course'
    }]
  })

  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id: 'fgjk4598jhung',
      name: 'Parish',
      room: 'Adda'
    }

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('Should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Parish', 'Mezbibur']);
  });

  it('Should return names for React course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Khan']);
  });

  it('Should find user', () => {
    var userfind = users.getUser('2');

    expect(userfind).toEqual({
      id: '2',
      name: 'Khan',
      room: 'React Course'
    })
  });

  it('Should not find user', () => {
    var userfind = users.getUser('4');
    
    expect(userfind).toEqual(undefined);
  });

  it('Should remove a user', () => {
    var user = users.removeUser('2');

    expect(user.id).toBe('2');
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user', () => {
    var user = users.removeUser('4');

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
})