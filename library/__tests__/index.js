import lib from '../index'

test('parse and render', () => {
  const config = {
    blocks: [
      {
        type: 'Paragraph',
        children: 'Test Message',
      },
    ],
  }

  expect(lib.render(lib.parse(config))).toMatchInlineSnapshot(`
    <div
      _type="Wrapper"
    >
      <p
        _accepts={
          Array [
            "text",
          ]
        }
        _category="block"
        _id="0"
        _type="Paragraph"
      >
        Test Message
      </p>
    </div>
  `)
})

test('italic text', () => {
  const config = {
    blocks: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Italic',
            children: 'Test Message',
          },
        ],
      },
    ],
  }

  expect(lib.render(lib.parse(config))).toMatchInlineSnapshot(`
    <div
      _type="Wrapper"
    >
      <p
        _accepts={
          Array [
            "text",
          ]
        }
        _category="block"
        _id="0"
        _type="Paragraph"
      >
        <input
          _category="text"
          _id="0_0"
          _type="Italic"
          onChange={[Function]}
          style={
            Object {
              "fontStyle": "italic",
            }
          }
          value="Test Message"
        />
      </p>
    </div>
  `)
})
