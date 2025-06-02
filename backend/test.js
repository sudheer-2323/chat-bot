async function test() {
  const response = await fetch('http://localhost:3000/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'Astronaut riding a horse' }),
  });
  const data = await response.json();
  console.log(data);
}

test();