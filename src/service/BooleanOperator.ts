export class BooleanOperator {
    equalTo(subject, compare, response) {
        if( subject == compare  ) {
            return response;
        }

        return null;
    }

    greaterThan(subject, compare, response) {
        if( subject > compare  ) {
            return response;
        }

        return null;
    }

    lessThan(subject, compare, response) {
        if( subject < compare  ) {
            return response;
        }

        return null;
    }

    greaterThanOrEqualTo(subject, compare, response) {
        if( subject >= compare  ) {
            return response;
        }

        return null;
    }

    lessThanOrEqualTo(subject, compare, response) {
        if( subject <= compare  ) {
            return response;
        }

        return null;
    }
}