import dns from 'dns';
const hostname = '_mongodb._tcp.cluster0.07qz7kb.mongodb.net';
dns.resolveSrv(hostname, (err, addresses) => {
  if (err) {
    console.error('DNS Resolve Error:', err);
  } else {
    console.log('DNS Success:', addresses);
  }
});
