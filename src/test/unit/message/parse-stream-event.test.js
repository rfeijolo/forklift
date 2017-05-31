const test = require('tape');
const parser = require('../../../message/parse-stream-event');
const streamEvent = {
  Records :[
    {
      eventID:'d28d4184d8f4cc12eb759b1609d47c60',
      eventName: 'INSERT',
      eventVersion: '1.1',
      eventSource: 'aws:dynamodb',
      awsRegion: 'us-east-1',
      dynamodb: {
        ApproximateCreationDateTime: 1495995000,
        Keys: {
          id: { S: 'fe30a970-43d0-11e7-ae97-378819848363' }
        },
        NewImage:{
          createdAt: { N: '1495995055494' },
          topicId: { S: 'fc5c5ea0-43d0-11e7-91d7-3f0f8a251c0d' },
          id: { S: 'fe30a970-43d0-11e7-ae97-378819848363' },
          text: { S: 'There is a new version available. Check it out on the website.' },
          ownerId: { S: '367b733f-bf74-4c86-a43a-f753e00442c4' },
          title: { S: 'anyTitle' },
          updatedAt: { N: '1495995055494' }
        },
        SequenceNumber: '297957100000000027166996065',
        SizeBytes: 275,
        StreamViewType: 'NEW_IMAGE'
      },
      eventSourceARN: 'arn:aws:dynamodb:us-east-1:651189268295:table/messages/stream/2017-03-26T22:58:37.106'
    }
  ]
};
test('test', (assert) => {
  const result = parser(streamEvent);
  const expectedMessages = [{
    topicId: 'fc5c5ea0-43d0-11e7-91d7-3f0f8a251c0d',
    text: 'There is a new version available. Check it out on the website.',
    title: 'anyTitle',
  }];
  assert.deepEqual(result, expectedMessages);
  assert.end();
});
