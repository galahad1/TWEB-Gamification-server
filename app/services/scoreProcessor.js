/**
 * This class is used to calculus score won by an user
 * given a context (application and type of activity)
 * @author Tano Iannetta
 */
class ScoreProcessor {


  /**
   * Calculus the score from the strength of a password
   * @param strength of the password
   * @returns score calculated
   */
  processStrengthScore(strenght) {
    var score = strenght * 1;
    return score;
  }
};

module.exports = ScoreProcessor;
