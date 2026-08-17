import { Exception } from '@adonisjs/core/exceptions'

export class ApiException extends Exception {}

export class ResourceNotFoundException extends ApiException {
  static status = 404
  static code = 'E_RESOURCE_NOT_FOUND'
}

export class BusinessRuleException extends ApiException {
  static status = 422
  static code = 'E_BUSINESS_RULE'
}

export class ConflictException extends ApiException {
  static status = 409
  static code = 'E_RESOURCE_CONFLICT'
}
