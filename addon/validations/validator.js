/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import Ember from 'ember';

const {
  isNone
} = Ember;

/**
 * ## Common Options
 *
 * <h3 id="description">description</h3>
 * A descriptor for your attribute used in the error message strings. Defaults to `This field'`.
 * You can overwrite this value in your `validators/messages.js` file by changing the `defaultDescription` property.
 *
 * ```javascript
 * // Examples
 * validator('date', {
 *   description: 'Date of birth'
 * })
 * // If validation is run and the attribute is empty, the error returned will be:
 * // 'Date of birth can't be blank'
 * ```
 *
 * <h3 id="dependentKeys">dependentKeys</h3>
 * A list of other model specific dependents for you validator.
 *
 * ```javascript
 * // Examples
 * validator('has-friends', {
 *   dependentKeys: ['friends.[]']
 * })
 * validator('has-valid-friends', {
 *   dependentKeys: ['friends.@each.username']
 * })
 * validator('x-validator', {
 *   dependentKeys: ['username', 'email', 'meta.foo.bar']
 * })
 * ```
 *
 * <h3 id="disabled">disabled</h3>
 * If set to `true`, disables the given validator. This option would usually go hand-in-hand
 * with {{#crossLinkModule 'Advanced Usage'}}options as functions{{/crossLinkModule}} and `dependentKeys`. Defaults to `false`.
 *
 * ```js
 * // Examples
 * validator('presence', {
 *   presence: true,
 *   disabled: true
 * })
 * validator('presence', {
 *   presence: true,
 *   dependentKeys: ['shouldValidate'],
 *   disabled() {
 *     return !this.get('model.shouldValidate');
 *   }
 * })
 * ```
 *
 * <h3 id="debounce">debounce</h3>
 * Debounces the validation with the given time in `milliseconds`. All debounced validations will be handled asynchronously (wrapped in a promise).
 *
 * ```javascript
 * // Examples
 * validator('length', {
 *   debounce: 500
 * })
 * validator('x-validator', {
 *   debounce: 250
 * })
 * ```
 *
 * <h3 id="message">message</h3>
 * This option can take two forms. It can either be a `string` or a `function`. If a string is used, then it will overwrite all error message types for the specified validator.
 *
 * ```javascript
 * // Example: String
 * validator('confirmation', {
 *   message: 'Email does not match {attribute}. What are you even thinking?!'
 * })
 * ```
 *
 * We can pass a `function` into our message option for even more customization capabilities.
 *
 * ```javascript
 * // Example: Function
 * validator('date', {
 *   message: function(type, options, value, context) {
 *     if (type === 'before') {
 *       return '{description} should really be before {date}';
 *     }
 *     if (type === 'after') {
 *       return '{description} should really be after {date}';
 *     }
 *   }
 * })
 * ```
 * The message function is given the following arguments:
 *
 * - `type` (**String**): The error message type
 * - `options` (**Object**): The validator options that were defined in the model
 * - `value`: The current value being evaluated
 * - `context` (**Object**): Context for string replacement
 *
 * The return value must be a `string`. If nothing is returned (`undefined`), defaults to the default error message of the specified type.
 *
 * Within this function, the context is set to that of the current validator. This gives you access to the model, defaultMessages, options and more.
 *
 *
 * <h2 id="functionBasedValidators">Function Based Validators</h2>
 *
 * A validator can also be declared with a function. The function will be then wrapped in the [Base Validator](./base.md) class and used just like any other pre-defined validator.
 *
 * ```javascript
 * // Example
 * validator(function(value, options, model, attribute) {
 *   return value === options.username ? true : `must be ${options.username}`;
 * } , {
 *   username: 'John' // Any options can be passed here
 * })
 * ```
 *
 * @module Validators
 * @main Validators
 */

export default function (arg1, options) {
  const props = {
    options: isNone(options) ? {} : options
  };

  if (typeof arg1 === 'function') {
    props.validate = arg1;
    props._type = 'function';
  } else if (typeof arg1 === 'string') {
    props._type = arg1;
  } else {
    throw new TypeError('[ember-cp-validations] Unexpected type for first validator argument. It should either be a string or a function');
  }

  return props;
}
