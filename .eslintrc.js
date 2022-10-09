module.exports = {
    extends: ['prettier', 'next'],
    plugins: ['prettier', 'react-hooks'],
    rules: {
        indent: ['warn', 4],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/no-array-index-key': 0,
        'react/function-component-definition': [
            'warn',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-named-as-default': 0,
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'max-len': ['warn', { code: 80, ignoreComments: true }],
        'no-unused-vars': ['warn'],
        'no-restricted-imports': ['error'],
    },
};
