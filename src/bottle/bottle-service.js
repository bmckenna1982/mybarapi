const BottleService = {

    getAllBottles(db) {
        return db.select('*').from('bottles')
    },

    getById(db, id) {
        return db
            .select('*')
            .from('bottles')
            .where('upc', id)
            .first()
    },

    insertBottle(db, bottle) {
        return db
            .insert(bottle)
            .into('bottles')
            .returning('*')
            .then(rows => rows[0])
    }
    // **TO DO serialize the inserts to protect xss
    // serializeSchedule(schedule) {
    //     const { author } = article
    //     return {
    //       id: article.id,
    //       style: article.style,
    //       title: xss(article.title),
    //       content: xss(article.content),
    //       date_created: new Date(article.date_created),
    //       number_of_comments: Number(article.number_of_comments) || 0,
    //       author: {
    //         id: author.id,
    //         user_name: author.user_name,
    //         full_name: author.full_name,
    //         nickname: author.nickname,
    //         date_created: new Date(author.date_created),
    //         date_modified: new Date(author.date_modified) || null
    //       },
    //     }
    //   },
}

module.exports = BottleService